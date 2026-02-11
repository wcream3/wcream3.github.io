
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MOCK_PLAYERS, PRANK_LIBRARY } from './constants.tsx';
import { Player, PrankAction, LogEntry, GeminiPrankSuggestion } from './types.ts';
import { PlayerCard } from './components/PlayerCard.tsx';
import { ActionCard } from './components/ActionCard.tsx';
import { ConnectionStatus } from './components/ConnectionStatus.tsx';
import { IntegrationGuide } from './components/IntegrationGuide.tsx';
import { generateCreativePrank } from './services/geminiService.ts';

const App: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<GeminiPrankSuggestion | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [useRcon, setUseRcon] = useState(true);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executePrank = useCallback((action: PrankAction | { name: string, commandTemplate?: string }) => {
    if (!selectedPlayer) return;

    const command = 'commandTemplate' in action 
      ? action.commandTemplate.replace('{player}', selectedPlayer.name)
      : `/troll execute ${action.name.toLowerCase().replace(/\s/g, '_')} ${selectedPlayer.name}`;

    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      target: selectedPlayer.name,
      action: action.name,
      status: isConnected ? 'Success' : 'Pending'
    };

    setLogs(prev => [newLog, ...prev].slice(0, 25));
    
    console.log(`Sending to Server via ${useRcon ? 'RCON' : 'Bridge'}: ${command}`);

    if ('vibrate' in navigator) {
      navigator.vibrate([30, 10, 30]);
    }

    if (!isConnected) {
      const timer = setTimeout(() => {
        setShowGuide(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedPlayer, isConnected, useRcon]);

  const handleAiTroll = async () => {
    if (!selectedPlayer) return;
    setIsGenerating(true);
    try {
      const suggestion = await generateCreativePrank(selectedPlayer);
      setAiSuggestion(suggestion);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleConnect = () => {
    const loadingLog: LogEntry = {
      id: 'conn-' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      target: 'SYSTEM',
      action: `Initializing ${useRcon ? 'RCON' : 'Bridge'} Auth...`,
      status: 'Pending'
    };
    setLogs(prev => [loadingLog, ...prev]);
    
    setTimeout(() => {
      setIsConnected(true);
      setLogs(prev => [{
        id: 'conn-success-' + Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        target: 'SYSTEM',
        action: 'Authenticated Successfully',
        status: 'Success'
      }, ...prev]);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-4 gap-6 max-w-[1600px] mx-auto relative overflow-hidden">
      {showGuide && <IntegrationGuide onClose={() => setShowGuide(false)} />}
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(circle,rgba(139,92,246,0.3)_1px,transparent_1px)] bg-[length:20px_20px] z-0" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-[99]" />

      <aside className="w-full md:w-80 flex flex-col gap-4 relative z-10">
        <header className="mb-2 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-orbitron text-2xl font-bold text-violet-500 neon-text tracking-tighter">
                ATM MASTER
              </h1>
              <p className="text-[9px] text-slate-500 font-mono">v3.0 ALPHA-RELEASE</p>
            </div>
            <button 
              onClick={() => setShowGuide(true)}
              className="p-2 bg-white/5 hover:bg-violet-500/20 rounded-lg transition-colors border border-white/5 group"
            >
              <svg className="w-4 h-4 text-violet-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Protocol</span>
              <div className="flex gap-2">
                <button onClick={() => setUseRcon(true)} className={`text-[9px] px-2 py-0.5 rounded ${useRcon ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-500'}`}>RCON</button>
                <button onClick={() => setUseRcon(false)} className={`text-[9px] px-2 py-0.5 rounded ${!useRcon ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-500'}`}>BRIDGE</button>
              </div>
            </div>
            <ConnectionStatus isConnected={isConnected} onConnect={handleConnect} />
          </div>
        </header>

        <section className="flex flex-col gap-3 flex-1 overflow-hidden">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 flex items-center justify-between">
            Online Targets
            <span className="text-[10px] text-green-500 font-mono animate-pulse">● LIVE</span>
          </h2>
          <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
            {MOCK_PLAYERS.map(player => (
              <PlayerCard 
                key={player.id} 
                player={player} 
                isSelected={selectedPlayer?.id === player.id}
                onSelect={setSelectedPlayer}
              />
            ))}
          </div>
        </section>

        <section className="h-40 glass rounded-xl p-4 border-white/5 flex flex-col overflow-hidden shadow-inner shadow-black/40">
          <div className="flex-1 flex flex-col gap-1 text-[9px] font-mono overflow-y-auto custom-scrollbar leading-tight">
            {logs.length === 0 ? (
              <p className="text-slate-600 italic">No activity recorded.</p>
            ) : (
              logs.map(log => (
                <div key={log.id} className="group border-l border-white/10 pl-2 py-0.5">
                  <span className="text-slate-600 mr-1 opacity-50">{log.timestamp.split(' ')[0]}</span>
                  <span className="text-violet-500">[{log.target}]</span>
                  <span className="text-slate-400 ml-1">exec: {log.action}</span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>
        </section>
      </aside>

      <main className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-24 md:pb-0 relative z-10">
        {selectedPlayer ? (
          <>
            <section className="glass rounded-2xl p-6 border-violet-500/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-violet-600/5 rounded-full blur-3xl transition-all group-hover:bg-violet-600/10" />

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-orbitron font-bold text-white tracking-tight">
                      {selectedPlayer.name}
                    </h2>
                    <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/20">READY</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-[10px] text-slate-500 font-mono uppercase">
                    <span className="flex items-center gap-1"><span className="w-1 h-1 bg-slate-500 rounded-full"/> POS: {selectedPlayer.location}</span>
                    <span className="flex items-center gap-1"><span className="w-1 h-1 bg-slate-500 rounded-full"/> TASK: {selectedPlayer.recentActivity}</span>
                  </div>
                </div>
                <button 
                  onClick={handleAiTroll}
                  disabled={isGenerating}
                  className="w-full md:w-auto px-6 py-3 bg-violet-600 rounded-xl font-bold hover:bg-violet-500 transition-all shadow-xl shadow-violet-900/40 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 border border-violet-400/20 group"
                >
                  {isGenerating ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-xs uppercase tracking-widest">Generate Custom Chaos</span>
                      <svg className="w-4 h-4 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </>
                  )}
                </button>
              </div>

              {aiSuggestion && !isGenerating && (
                <div className="mb-8 p-6 bg-black/40 rounded-2xl border border-violet-500/30 animate-in fade-in zoom-in-95 duration-500 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-bold text-violet-400 uppercase tracking-[0.2em]">Predicted High Impact Result</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white font-orbitron">{aiSuggestion.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed italic">"{aiSuggestion.description}"</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono text-[11px] text-violet-300">
                      <span className="text-slate-600 block mb-1 text-[9px] uppercase tracking-widest">Logic Engine</span>
                      {aiSuggestion.logic}
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                      <button 
                        onClick={() => executePrank({ name: aiSuggestion.title })}
                        className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-slate-100 transition-all uppercase tracking-[0.3em] text-xs shadow-2xl"
                      >
                        Initiate Sequence
                      </button>
                      <button onClick={() => setAiSuggestion(null)} className="text-[10px] text-slate-500 hover:text-white uppercase font-bold transition-colors">Discard Draft</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
                {PRANK_LIBRARY.map(action => (
                  <ActionCard 
                    key={action.id} 
                    action={action} 
                    onExecute={executePrank}
                    disabled={false}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 glass rounded-2xl border-dashed border-white/10 min-h-[500px]">
            <div className="w-32 h-32 mb-8 rounded-full bg-violet-500/5 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-ping opacity-20" />
              <div className="absolute inset-2 rounded-full border border-violet-500/40 animate-ping opacity-10" />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-violet-500/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-orbitron font-bold mb-4 uppercase tracking-tighter">Scan Terminal Initiated</h2>
            <p className="text-slate-500 max-w-sm leading-relaxed text-sm">Target selection required to establish packet-injection route. Select a player to view real-time data and chaos vectors.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
