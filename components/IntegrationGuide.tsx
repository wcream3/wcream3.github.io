
import React, { useState } from 'react';

export const IntegrationGuide: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'code' | 'hosting'>('steps');

  const kubeJSCode = `// ATM Prankster Bridge for NeoForge/Forge
// Requirements: KubeJS (usually pre-installed in ATM packs)
// Save as: world/kubejs/server_scripts/troll.js

ServerEvents.commandRegistry(event => {
    const { commands: Commands, arguments: Arguments } = event;

    event.register(
        Commands.literal('troll')
            .requires(s => s.hasPermission(2))
            .then(Commands.literal('particles')
                .then(Commands.literal('shiny')
                    .then(Commands.argument('target', Arguments.PLAYER.create(event))
                        .executes(ctx => {
                            const player = Arguments.PLAYER.getResult(ctx, 'target');
                            player.tell("§e§lA SHINY POKEMON HAS APPEARED!");
                            player.spawnParticles("minecraft:end_rod", true, player.x, player.y + 1, player.z, 1, 1, 1, 100, 0.1);
                            return 1;
                        })
                    )
                )
            )
            .then(Commands.literal('message')
                .then(Commands.literal('ban')
                    .then(Commands.argument('target', Arguments.PLAYER.create(event))
                        .executes(ctx => {
                            const player = Arguments.PLAYER.getResult(ctx, 'target');
                            player.tell("§c§l[SYSTEM] Automated ban initiated. 10 seconds remaining.");
                            player.playSound("minecraft:block.note_block.bass");
                            return 1;
                        })
                    )
                )
            )
    );
});`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass max-w-3xl w-full max-h-[90vh] flex flex-col rounded-3xl border-violet-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex border-b border-white/10">
          {(['steps', 'code', 'hosting'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-violet-400 bg-violet-500/5 border-b-2 border-violet-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab === 'steps' ? '1. Server Setup' : tab === 'code' ? '2. KubeJS Code' : '3. Deployment'}
            </button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'steps' && (
            <div className="space-y-6 text-sm text-slate-300">
              <h2 className="font-orbitron text-xl font-bold text-white mb-2 uppercase tracking-tighter">NeoForge RCON</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-1">Step A: server.properties</h4>
                  <pre className="mt-2 p-2 bg-black/40 rounded text-violet-300 text-[10px]">
                    enable-rcon=true{"\n"}
                    rcon.password=your_secret_password{"\n"}
                    rcon.port=25575
                  </pre>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-1">Step B: Port Forward</h4>
                  <p className="text-xs">Port <code>25575</code> must be open for the browser to reach your IP.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-4">
              <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-tighter">KubeJS Script</h2>
              <div className="p-3 bg-violet-500/10 rounded border border-violet-500/20 text-[10px] text-violet-300 font-mono mb-2">
                Save to: world/kubejs/server_scripts/troll.js
              </div>
              <div className="relative group">
                <pre className="p-4 bg-black/60 rounded-xl font-mono text-xs text-violet-400 border border-white/10 overflow-x-auto h-64 custom-scrollbar">
                  {kubeJSCode}
                </pre>
                <button onClick={() => navigator.clipboard.writeText(kubeJSCode)} className="absolute top-2 right-2 p-2 bg-violet-600 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold">COPY</button>
              </div>
            </div>
          )}

          {activeTab === 'hosting' && (
            <div className="space-y-6 text-sm text-slate-300">
              <h2 className="font-orbitron text-xl font-bold text-white uppercase tracking-tighter">GitHub Pages Deployment</h2>
              
              <div className="space-y-4">
                <section>
                  <h3 className="text-violet-400 font-bold mb-2">1. The "Upload List"</h3>
                  <p className="text-xs mb-2 text-slate-400">Upload these files to your GitHub Repository root:</p>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="p-2 bg-white/5 rounded">index.html</div>
                    <div className="p-2 bg-white/5 rounded">index.tsx</div>
                    <div className="p-2 bg-white/5 rounded">App.tsx</div>
                    <div className="p-2 bg-white/5 rounded">types.ts</div>
                    <div className="p-2 bg-white/5 rounded">constants.tsx</div>
                    <div className="p-2 bg-white/5 rounded">metadata.json</div>
                    <div className="p-2 bg-white/5 rounded">components/ (folder)</div>
                    <div className="p-2 bg-white/5 rounded">services/ (folder)</div>
                  </div>
                </section>

                <section className="p-4 bg-violet-600/10 rounded-xl border border-violet-500/20">
                  <h3 className="text-white font-bold mb-2 text-xs">2. Enable Pages</h3>
                  <ol className="list-decimal list-inside text-[11px] space-y-1 text-slate-300">
                    <li>Go to <b>Settings</b> in your GitHub Repo.</li>
                    <li>Click <b>Pages</b> in the left sidebar.</li>
                    <li>Under "Build and deployment", set source to <b>Deploy from a branch</b>.</li>
                    <li>Select <b>Main</b> and <b>/ (root)</b>, then click <b>Save</b>.</li>
                  </ol>
                </section>

                <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <h4 className="text-yellow-400 font-bold mb-1 text-xs">⚠️ Important Notice</h4>
                  <p className="text-[10px] leading-tight">Since this is a client-side app, your server IP and RCON password are sent from your <b>own browser</b>. They are not stored on GitHub.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-black/20 border-t border-white/5">
          <button onClick={onClose} className="w-full py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-bold text-white transition-all uppercase tracking-widest text-xs shadow-lg shadow-violet-500/20">
            Got it, Let's Deploy
          </button>
        </div>
      </div>
    </div>
  );
};
