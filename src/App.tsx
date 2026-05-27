import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Bell,
  Check,
  ChevronRight,
  CircleDot,
  Crosshair,
  Gem,
  Grid2X2,
  Home,
  KeyRound,
  Layers,
  Lock,
  LogOut,
  Monitor,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from "lucide-react";

const Button = ({ children, className = "", onClick, disabled, type = "button" }: any) => (
  <button type={type} onClick={onClick} disabled={disabled} className={className}>
    {children}
  </button>
);

const menu = [
  { label: "Dashboard", icon: Home },
  { label: "Triggerbot", icon: CircleDot },
  { label: "Keybind", icon: KeyRound },
  { label: "Color", icon: SlidersHorizontal },
  { label: "Misc", icon: Grid2X2 },
  { label: "Config", icon: Layers },
  { label: "Settings", icon: Settings },
];

const LIFETIME_KEYS = [
  "DUELIST-1251-QX7P",
  "DUELIST-1252-NM4L",
  "DUELIST-1253-WP8A",
  "DUELIST-1254-ZL2Q",
  "DUELIST-1255-HX9P",
  "DUELIST-1256-RQ3L",
  "DUELIST-1257-TM7A",
  "DUELIST-1258-KP4X",
  "DUELIST-1259-BL8Q",
  "DUELIST-1260-YX2P",
  "DUELIST-1261-MQ5L",
  "DUELIST-1262-VP9A",
  "DUELIST-1263-JL3X",
  "DUELIST-1264-NQ7P",
  "DUELIST-1265-WM4L",
  "DUELIST-1266-ZP8A",
  "DUELIST-1267-HL2Q",
  "DUELIST-1268-RX9P",
  "DUELIST-1269-TQ3L",
  "DUELIST-1270-KM7A",
  "DUELIST-1271-BP4X",
  "DUELIST-1272-YL8Q",
  "DUELIST-1273-MX2P",
  "DUELIST-1274-VQ5L",
  "DUELIST-1275-JP9A",
  "DUELIST-1276-NL3X",
  "DUELIST-1277-WQ7P",
  "DUELIST-1278-ZM4L",
  "DUELIST-1279-HP8A",
  "DUELIST-1280-RL2Q",
  "DUELIST-1281-TX9P",
  "DUELIST-1282-KQ3L",
  "DUELIST-1283-BM7A",
  "DUELIST-1284-YP4X",
  "DUELIST-1285-ML8Q",
  "DUELIST-1286-VX2P",
  "DUELIST-1287-JQ5L",
  "DUELIST-1288-NP9A",
  "DUELIST-1289-WL3X",
  "DUELIST-1290-ZQ7P",
  "DUELIST-1291-HM4L",
  "DUELIST-1292-RP8A",
  "DUELIST-1293-TL2Q",
  "DUELIST-1294-KX9P",
  "DUELIST-1295-BQ3L",
  "DUELIST-1296-YM7A",
  "DUELIST-1297-MP4X",
  "DUELIST-1298-VL8Q",
  "DUELIST-1299-JX2P",
  "DUELIST-1300-NQ5L",
  "DUELIST-1301-WP9A",
  "DUELIST-1302-ZL3X",
  "DUELIST-1303-HQ7P",
  "DUELIST-1304-RM4L",
  "DUELIST-1305-TP8A",
  "DUELIST-1306-KL2Q",
  "DUELIST-1307-BX9P",
  "DUELIST-1308-YQ3L",
  "DUELIST-1309-MM7A",
  "DUELIST-1310-HP9L"
];

const MONTHLY_KEYS = [
  "SLOTTED-3001-QX7P",
  "SLOTTED-3002-NM4L",
  "SLOTTED-3003-WP8A",
  "SLOTTED-3004-ZL2Q",
  "SLOTTED-3005-HX9P",
  "SLOTTED-3006-RQ3L",
  "SLOTTED-3007-TM7A",
  "SLOTTED-3008-KP4X",
  "SLOTTED-3009-BL8Q",
  "SLOTTED-3010-YX2P",
  "SLOTTED-3011-MQ5L",
  "SLOTTED-3012-VP9A",
  "SLOTTED-3013-JL3X",
  "SLOTTED-3014-NQ7P",
  "SLOTTED-3015-WM4L",
  "SLOTTED-3016-ZP8A",
  "SLOTTED-3017-HL2Q",
  "SLOTTED-3018-RX9P",
  "SLOTTED-3019-TQ3L",
  "SLOTTED-3020-KM7A"
];

const VALID_KEYS = [...LIFETIME_KEYS, ...MONTHLY_KEYS];

const gamePresets = [
  { name: "Valorant", image: "/games/valorant.jpg" },
  { name: "CS2", image: "/games/cs2.jpg" },
  { name: "Marvel Rivals", image: "/games/marvel-rivals.jpg" },
  { name: "Overwatch 2", image: "/games/overwatch-2.jpg" },
  { name: "R6 Siege", image: "/games/r6-siege.jpg" },
  { name: "Apex Legends", image: "/games/apex-legends.jpg" },
  { name: "The Finals", image: "/games/the-finals.jpg" },
  { name: "Fragpunk", image: "/games/fragpunk.jpg" },
  { name: "Delta Force", image: "/games/delta-force.jpg" },
  { name: "PUBG", image: "/games/pubg.jpg" },
  { name: "Call of Duty", image: "/games/call-of-duty.jpg" },
  { name: "Arc Raiders", image: "/games/arc-raiders.jpg" },
  { name: "Battlefield 6", image: "/games/battlefield-6.jpg" },
  { name: "Paladins", image: "/games/paladins.jpg" },
  { name: "Splitgate", image: "/games/splitgate.jpg" },
];

function getKeyPlan(key: string) {
  if (LIFETIME_KEYS.includes(key)) return "LIFE TIME";
  if (MONTHLY_KEYS.includes(key)) return "30 DAY";
  return "UNKNOWN";
}

function GlassCard({ children, className = "" }: any) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur-xl ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.08),transparent_36%,rgba(255,0,0,.035))]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_0_30px_rgba(225,29,46,.14)]">
      <span className="text-2xl font-black tracking-tighter text-white">D</span>
      <span className="absolute -right-1 top-2 h-8 w-[3px] rotate-45 rounded-full bg-red-600 shadow-[0_0_18px_rgba(239,68,68,.9)]" />
    </div>
  );
}

function Toggle({ enabled, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`relative h-7 w-[54px] rounded-full border p-1 transition-all duration-300 ${
        enabled ? "border-red-500/60 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,.18)]" : "border-white/10 bg-white/[.04]"
      }`}
    >
      <span className={`block h-5 w-5 rounded-full transition-all duration-300 ${enabled ? "translate-x-6 bg-red-500" : "translate-x-0 bg-zinc-500"}`} />
    </button>
  );
}

function SliderRow({ label, value, onChange, min = 0, max = 100 }: any) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/[.06] bg-black/30 p-4">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-300">{label}</span>
        <span className="font-semibold text-white">{value}%</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-red-500" />
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-white transition-all duration-300" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function StatusPill({ children, tone = "red" }: any) {
  const color = tone === "green" ? "bg-emerald-500" : "bg-red-500";
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-medium text-zinc-200">
      <span className={`h-2 w-2 rounded-full ${color} shadow-[0_0_14px_currentColor]`} />
      {children}
    </div>
  );
}

function SettingsPanel({ title, subtitle, children }: any) {
  return (
    <GlassCard className="animate-[fadeIn_.35s_ease]">
      <div className="flex items-center justify-between gap-4 border-b border-white/[.06] p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.22em] text-red-400">Module</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{title}</h3>
          <p className="mt-2 text-zinc-400">{subtitle}</p>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <SlidersHorizontal className="h-7 w-7 text-red-400" />
        </div>
      </div>
      <div className="space-y-5 p-7">{children}</div>
    </GlassCard>
  );
}

function InputBox({ label, value, onChange, suffix = "" }: any) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-semibold text-white">{label}</span>
        {suffix && <span className="text-xs uppercase tracking-[.2em] text-zinc-600">{suffix}</span>}
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-12 w-full rounded-2xl border border-white/10 bg-black/60 px-4 text-white outline-none transition focus:border-red-500/50"
      />
    </div>
  );
}

function GamePresetImage({ game }: any) {
  return (
    <img
      src={game.image}
      alt={game.name}
      className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-90"
    />
  );
}

export default function DuelistColorBotGUI() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [features, setFeatures] = useState({ Triggerbot: true });
  const [toast, setToast] = useState("System online.");
  const [checking, setChecking] = useState(false);
  const [aimSettings, setAimSettings] = useState({ smoothness: 68, fov: 42, delay: 24 });
  const [triggerSettings, setTriggerSettings] = useState({ delay: 31, burst: 56, accuracy: 74 });
  const [flickSettings, setFlickSettings] = useState({ speed: 62, fov: 35, smoothing: 48, delay: 14 });
  const [rcsSettings, setRcsSettings] = useState({ vertical: 58, horizontal: 24, strength: 66, startBullet: 3 });
  const [espSettings, setEspSettings] = useState({ box: true, skeleton: true, health: true, name: true, distance: true, snaplines: false, glow: false });
  const [radarSettings, setRadarSettings] = useState({ enabled: true, enemyDots: true, teamDots: false, names: true, distance: true, rotate: true, range: 62, size: 58, opacity: 76 });
  const [appSettings, setAppSettings] = useState({ scale: 82, accent: 76 });
  const [colorSettings, setColorSettings] = useState({ hex: "#ffcc00", tolerance: 64, speed: 72, preset: "Yellow" });
  const [screenSettings, setScreenSettings] = useState({ width: 1920, height: 1080, fovX: 4, fovY: 4, delay: 12, fps: 240 });
  const [activationKey, setActivationKey] = useState("MB5");
  const [waitingForBind, setWaitingForBind] = useState(false);
  const [holdMode, setHoldMode] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [running, setRunning] = useState(false);
  const [runtimeSeconds, setRuntimeSeconds] = useState(0);
  const [miscSettings, setMiscSettings] = useState({
    "Focus Window Only": true,
    "Auto Disable On Alt Tab": true,
    "Humanization Filter": false,
    "Ignore Friendly Colors": true,
    "Dynamic FOV Scaling": true,
    "GPU Acceleration": true,
    "Motion Prediction": true,
    "Particle Filtering": true,
  });
  const [captureMethod, setCaptureMethod] = useState("Windows Graphics Capture");
  const [scanMode, setScanMode] = useState("Legit");
  const [licenseKey, setLicenseKey] = useState("");
  const [subscriptionPlan, setSubscriptionPlan] = useState("30 DAY");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [modal, setModal] = useState<any>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [authStage, setAuthStage] = useState<"idle" | "checking" | "success">("idle");
  const [showApp, setShowApp] = useState(false);
  const [activityLog, setActivityLog] = useState<string[]>(["Secure session initialized.", "External mode enabled.", "Scanner ready."]);
  const [targetsDetected, setTargetsDetected] = useState(0);
  const [responseTime, setResponseTime] = useState(3.2);
  const [confidence, setConfidence] = useState(94);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleKeybind(e: KeyboardEvent) {
      if (!waitingForBind) return;
      e.preventDefault();
      const key = e.key === " " ? "SPACE" : e.key.toUpperCase();
      setActivationKey(key);
      setWaitingForBind(false);
      notify(`Bound to ${key}`, "success");
    }

    function handleMouse(e: MouseEvent) {
      if (!waitingForBind) return;
      e.preventDefault();
      const mouseMap: Record<number, string> = { 0: "M1", 1: "MMB", 2: "M2", 3: "MB4", 4: "MB5" };
      const bind = mouseMap[e.button] || `MOUSE${e.button}`;
      setActivationKey(bind);
      setWaitingForBind(false);
      notify(`Bound to ${bind}`, "success");
    }

    window.addEventListener("keydown", handleKeybind);
    window.addEventListener("mousedown", handleMouse);
    return () => {
      window.removeEventListener("keydown", handleKeybind);
      window.removeEventListener("mousedown", handleMouse);
    };
  }, [waitingForBind]);

  const enabledCount = useMemo(() => Object.values(features).filter(Boolean).length, [features]);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setRuntimeSeconds((prev) => prev + 1);
      setTargetsDetected((prev) => prev + Math.floor(Math.random() * 3));
      setResponseTime(Number((2.4 + Math.random() * 1.6).toFixed(1)));
      setConfidence(Math.min(99, Math.max(82, colorSettings.tolerance + Math.floor(Math.random() * 8) - 3)));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, colorSettings.tolerance]);

  const formattedRuntime = useMemo(() => {
    const hours = Math.floor(runtimeSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((runtimeSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = Math.floor(runtimeSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }, [runtimeSeconds]);

  function toggleMiscSetting(name: string) {
    setMiscSettings((prev) => {
      const current = prev[name as keyof typeof prev];
      const next = !current;
      notify(`${name} ${next ? "enabled" : "disabled"}.`);
      return { ...prev, [name]: next };
    });
  }

  function playSound(type: "click" | "success" | "error" | "start" = "click") {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audio = new AudioContextClass();

      if (type === "start") {
        const master = audio.createGain();
        const compressor = audio.createDynamicsCompressor();
        compressor.threshold.value = -18;
        compressor.knee.value = 22;
        compressor.ratio.value = 10;
        compressor.attack.value = 0.003;
        compressor.release.value = 0.18;

        master.connect(compressor);
        compressor.connect(audio.destination);

        master.gain.setValueAtTime(0.0001, audio.currentTime);
        master.gain.exponentialRampToValueAtTime(0.24, audio.currentTime + 0.12);
        master.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 3.8);

        const sequence = [
          { freq: 110, time: 0, duration: 0.7, type: "sine" },
          { freq: 165, time: 0.18, duration: 0.6, type: "triangle" },
          { freq: 220, time: 0.36, duration: 0.7, type: "sawtooth" },
          { freq: 440, time: 0.58, duration: 0.45, type: "triangle" },
          { freq: 320, time: 1.1, duration: 0.8, type: "sawtooth" },
          { freq: 520, time: 1.45, duration: 0.75, type: "triangle" },
          { freq: 740, time: 1.9, duration: 0.9, type: "sine" },
          { freq: 980, time: 2.45, duration: 0.65, type: "triangle" },
        ];

        sequence.forEach((tone) => {
          const osc = audio.createOscillator();
          const gain = audio.createGain();
          const filter = audio.createBiquadFilter();

          osc.type = tone.type as OscillatorType;
          osc.frequency.setValueAtTime(tone.freq, audio.currentTime + tone.time);
          osc.frequency.exponentialRampToValueAtTime(tone.freq * 1.18, audio.currentTime + tone.time + tone.duration);

          filter.type = "lowpass";
          filter.frequency.value = 950;
          filter.Q.value = 1.4;

          gain.gain.setValueAtTime(0.0001, audio.currentTime + tone.time);
          gain.gain.exponentialRampToValueAtTime(0.16, audio.currentTime + tone.time + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + tone.time + tone.duration);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          osc.start(audio.currentTime + tone.time);
          osc.stop(audio.currentTime + tone.time + tone.duration);
        });

        const sub = audio.createOscillator();
        const subGain = audio.createGain();
        sub.type = "sine";
        sub.frequency.setValueAtTime(55, audio.currentTime);
        sub.frequency.exponentialRampToValueAtTime(95, audio.currentTime + 2.6);
        subGain.gain.setValueAtTime(0.0001, audio.currentTime);
        subGain.gain.exponentialRampToValueAtTime(0.08, audio.currentTime + 0.08);
        subGain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 3.2);
        sub.connect(subGain);
        subGain.connect(master);
        sub.start(audio.currentTime);
        sub.stop(audio.currentTime + 3.2);

        return;
      }

      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.type = "triangle";
      osc.frequency.value = type === "success" ? 620 : type === "error" ? 160 : 320;
      gain.gain.setValueAtTime(0.12, audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.16);
      osc.start();
      osc.stop(audio.currentTime + 0.16);
    } catch {}
  }

  function addLog(message: string) {
    setActivityLog((prev) => [message, ...prev].slice(0, 6));
  }

  function notify(message: string, type: "click" | "success" | "error" = "click") {
    playSound(type);
    setToast(message);
    addLog(message);
    window.clearTimeout((window as any).duelistToastTimer);
    (window as any).duelistToastTimer = window.setTimeout(() => setToast("System online."), 2400);
  }

  function authenticateKey() {
    const cleaned = licenseKey.trim().toUpperCase();
    if (authStage !== "idle") return;
    if (VALID_KEYS.includes(cleaned)) {
      setAuthError("");
      setAuthStage("checking");
      playSound("click");
      setTimeout(() => {
        setAuthStage("success");
        playSound("success");
      }, 850);
      setTimeout(() => {
        setSubscriptionPlan(getKeyPlan(cleaned));
        setAuthenticated(true);
        notify("License authenticated.", "success");
        setAuthStage("idle");
        setTimeout(() => setShowApp(true), 60);
      }, 1650);
    } else {
      setAuthError("Invalid license key.");
      playSound("error");
    }
  }

  function logout() {
    setAuthenticated(false);
    setShowApp(false);
    setLicenseKey("");
    setAuthError("");
  }

  function openModal(title: string, body: string) {
    setModal({ title, body });
    playSound("click");
  }

  function toggleFeature(feature: string) {
    setFeatures((prev: any) => ({ ...prev, [feature]: !prev[feature] }));
    notify(`${feature} updated.`);
  }

  function setColorPreset(name: string, hex: string) {
    setColorSettings((prev) => ({ ...prev, preset: name, hex }));
    notify(`${name} outline preset selected.`);
  }

  function toggleRunning() {
    const next = !running;
    setRunning(next);
    if (next) {
      playSound("start");
      setScanning(true);
      notify("Slotted is now running.", "success");
    } else {
      playSound("click");
      setScanning(false);
      notify("Slotted stopped.");
    }
  }

  function startColorScan() {
    setScanning(true);
    notify(`Screen color scan started for ${colorSettings.hex}.`, "success");
    openModal("Color Scan Active", `Slotted is now scanning for ${colorSettings.preset} outline color (${colorSettings.hex}).

Keybind: ${activationKey}
Mode: ${holdMode ? "Hold" : "Toggle"}
Tolerance: ${colorSettings.tolerance}%
Screen: ${screenSettings.width} × ${screenSettings.height}
FOV: ${screenSettings.fovX} × ${screenSettings.fovY}
Delay: ${screenSettings.delay}ms
FPS: ${screenSettings.fps}

Fully external mode enabled.`);
  }

  function stopColorScan() {
    setScanning(false);
    notify("Screen color scan stopped.");
  }

  function checkUpdates() {
    setChecking(true);
    setToast("Checking build status...");
    setTimeout(() => {
      setChecking(false);
      notify("Slotted is up to date.");
    }, 900);
  }

  const pageContent: any = {
    Triggerbot: (
      <SettingsPanel title="Triggerbot" subtitle="Timing response and fire discipline controls.">
        <SliderRow label="Trigger Delay" value={triggerSettings.delay} onChange={(value: number) => setTriggerSettings((prev) => ({ ...prev, delay: value }))} />
        <SliderRow label="Burst Control" value={triggerSettings.burst} onChange={(value: number) => setTriggerSettings((prev) => ({ ...prev, burst: value }))} />
        <SliderRow label="Accuracy Window" value={triggerSettings.accuracy} onChange={(value: number) => setTriggerSettings((prev) => ({ ...prev, accuracy: value }))} />
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">Mode: Hold Key · Safety: Enabled · Response: External</div>
      </SettingsPanel>
    ),
    Keybind: (
      <SettingsPanel title="Keybind" subtitle="Activation key and hold settings.">
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-white">Activation Keybind</div>
              <div className="mt-1 text-sm text-zinc-500">Click Set Keybind, then press any keyboard or mouse button.</div>
            </div>
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 font-bold text-white shadow-[0_0_22px_rgba(239,68,68,.12)]">{activationKey}</div>
          </div>
          <Button onClick={() => { setWaitingForBind(true); notify("Press any keyboard or mouse button."); }} className="flex h-12 w-full items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 font-semibold text-white transition hover:bg-red-500/20">
            {waitingForBind ? "Waiting for input..." : "Set Keybind"}
          </Button>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["MMB", "MB4", "MB5"].map((preset) => (
              <button key={preset} onClick={() => { setActivationKey(preset); setWaitingForBind(false); notify(`${preset} preset selected.`, "success"); }} className={`rounded-2xl border py-3 font-semibold transition ${activationKey === preset ? "border-red-500/40 bg-red-500/10 text-white" : "border-white/10 bg-black/40 text-zinc-300 hover:border-red-500/30 hover:text-white"}`}>
                {preset}
              </button>
            ))}
          </div>
          <label className="mt-5 flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-5">
            <div>
              <div className="font-semibold text-white">Hold To Activate</div>
              <div className="mt-1 text-sm text-zinc-500">Checked = hold keybind. Unchecked = toggle mode.</div>
            </div>
            <input type="checkbox" checked={holdMode} onChange={(e) => { setHoldMode(e.target.checked); notify(e.target.checked ? "Hold mode enabled." : "Toggle mode enabled."); }} className="h-5 w-5 accent-red-600" />
          </label>
        </div>
      </SettingsPanel>
    ),
    Color: (
      <SettingsPanel title="Color Scanner" subtitle="External color detection settings for outline-based screen scanning.">
        <div className="grid gap-5 xl:grid-cols-[1fr_.75fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold text-white">Target Outline Color</div>
                  <div className="mt-1 text-sm text-zinc-500">Choose a preset or paste your own HEX color.</div>
                </div>
                <div className="h-12 w-12 rounded-2xl border border-white/10 shadow-[0_0_22px_rgba(255,255,255,.12)]" style={{ backgroundColor: colorSettings.hex }} />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <button onClick={() => setColorPreset("Yellow", "#ffcc00")} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-yellow-400/40"><span className="mb-3 block h-8 w-full rounded-xl bg-yellow-400" /><span className="font-semibold text-white">Yellow</span></button>
                <button onClick={() => setColorPreset("Red", "#ff2d2d")} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-red-500/40"><span className="mb-3 block h-8 w-full rounded-xl bg-red-500" /><span className="font-semibold text-white">Red</span></button>
                <button onClick={() => setColorPreset("Purple", "#a855f7")} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-left transition hover:border-purple-500/40"><span className="mb-3 block h-8 w-full rounded-xl bg-purple-500" /><span className="font-semibold text-white">Purple</span></button>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-[auto_1fr] md:items-center">
                <input type="color" value={colorSettings.hex} onChange={(e) => setColorSettings((prev) => ({ ...prev, hex: e.target.value, preset: "Custom" }))} className="h-14 w-20 cursor-pointer rounded-2xl border border-white/10 bg-black p-1" />
                <input value={colorSettings.hex} onChange={(e) => setColorSettings((prev) => ({ ...prev, hex: e.target.value, preset: "Custom" }))} placeholder="#ffcc00" className="h-14 rounded-2xl border border-white/10 bg-black/60 px-5 text-white outline-none transition focus:border-red-500/50" />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Tolerance</div>
                  <div className="mt-1 text-sm text-zinc-500">Current sensitivity for matching the selected outline color.</div>
                </div>
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xl font-black text-white">{colorSettings.tolerance}%</div>
              </div>
              <SliderRow label="Color Tolerance" value={colorSettings.tolerance} onChange={(value: number) => setColorSettings((prev) => ({ ...prev, tolerance: value }))} />
            </div>
            <SliderRow label="Scan Speed" value={colorSettings.speed} onChange={(value: number) => setColorSettings((prev) => ({ ...prev, speed: value }))} />
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Scanner Status</div>
                <div className="mt-1 text-sm text-zinc-500">External mode · No injection</div>
              </div>
              <StatusPill tone={scanning ? "green" : "red"}>{scanning ? "Scanning" : "Idle"}</StatusPill>
            </div>
            <div className="mb-5 rounded-3xl border border-white/10 bg-black/50 p-5">
              <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full border border-white/10 bg-white/[.03]">
                <div className={`absolute inset-4 rounded-full border ${scanning ? "animate-ping border-emerald-400/50" : "border-white/10"}`} />
                <div className="grid h-24 w-24 place-items-center rounded-full border border-white/10" style={{ boxShadow: `0 0 38px ${colorSettings.hex}55` }}>
                  <SlidersHorizontal className="h-10 w-10" style={{ color: colorSettings.hex }} />
                </div>
              </div>
            </div>
            <Button onClick={scanning ? stopColorScan : startColorScan} className={`flex w-full items-center justify-center rounded-2xl border px-5 py-4 font-semibold text-white transition ${scanning ? "border-white/10 bg-white/[.04] hover:bg-white/[.07]" : "border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/15"}`}>
              {scanning ? "Stop Scanning" : "Start Screen Scan"}
            </Button>
          </div>
        </div>
      </SettingsPanel>
    ),
    Misc: (
      <SettingsPanel title="Misc" subtitle="Scanner behaviour, capture tuning, and runtime utilities.">
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(miscSettings).map(([name, enabled]) => (
            <div key={name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-5 transition hover:border-red-500/25">
              <div>
                <div className="font-semibold text-white">{name}</div>
                <div className="mt-1 text-sm text-zinc-500">Runtime scanning utility</div>
              </div>
              <Toggle enabled={enabled} onClick={() => toggleMiscSetting(name)} />
            </div>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Capture Method</div>
                <div className="mt-1 text-sm text-zinc-500">Desktop capture backend</div>
              </div>
              <Monitor className="h-5 w-5 text-red-400" />
            </div>
            <select
              value={captureMethod}
              onChange={(e) => {
                setCaptureMethod(e.target.value);
                notify(`Capture method set to ${e.target.value}.`);
              }}
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/60 px-4 text-white outline-none"
            >
              <option>Windows Graphics Capture</option>
              <option>Desktop Duplication</option>
              <option>OBS Compatible</option>
            </select>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/35 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">Scan Mode</div>
                <div className="mt-1 text-sm text-zinc-500">Detection profile behaviour</div>
              </div>
              <Crosshair className="h-5 w-5 text-red-400" />
            </div>
            <select
              value={scanMode}
              onChange={(e) => {
                setScanMode(e.target.value);
                notify(`Scan mode set to ${e.target.value}.`);
              }}
              className="h-12 w-full rounded-2xl border border-white/10 bg-black/60 px-4 text-white outline-none"
            >
              <option>Legit</option>
              <option>Balanced</option>
              <option>Aggressive</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-4">
          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between"><span className="text-zinc-500">GPU</span><Monitor className="h-5 w-5 text-red-400" /></div>
            <div className="text-2xl font-black text-white">RTX 4070</div>
            <div className="mt-2 text-sm text-zinc-500">Hardware acceleration active</div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between"><span className="text-zinc-500">Capture FPS</span><Activity className="h-5 w-5 text-red-400" /></div>
            <div className="text-2xl font-black text-white">{running ? Math.max(60, screenSettings.fps - 2) : 0}</div>
            <div className="mt-2 text-sm text-zinc-500">Live desktop capture</div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between"><span className="text-zinc-500">Runtime</span><Bell className="h-5 w-5 text-red-400" /></div>
            <div className="text-2xl font-black text-white">{formattedRuntime}</div>
            <div className="mt-2 text-sm text-zinc-500">Current active session</div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 flex items-center justify-between"><span className="text-zinc-500">Detection</span><ShieldCheck className="h-5 w-5 text-emerald-400" /></div>
            <div className={`text-2xl font-black ${running ? "text-emerald-400" : "text-zinc-500"}`}>{running ? "Undetected" : "Idle"}</div>
            <div className="mt-2 text-sm text-zinc-500">{running ? "Scanner operating normally" : "Waiting for start"}</div>
          </GlassCard>
        </div>
      </SettingsPanel>
    ),
    Config: (
      <SettingsPanel title="Config" subtitle="Game presets and saved profiles.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gamePresets.map((game) => (
            <button
              key={game.name}
              onClick={() => notify(`${game.name} preset loaded.`, "success")}
              className="group overflow-hidden rounded-[24px] border border-white/10 bg-black/35 text-left transition hover:border-red-500/35 hover:bg-white/[.045]"
            >
              <div className="relative h-28 overflow-hidden bg-black">
                <GamePresetImage game={game} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3">
                  <h4 className="text-lg font-black text-white">{game.name}</h4>
                  <ChevronRight className="h-5 w-5 text-red-400" />
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-zinc-500">Preset Profile</span>
                <StatusPill tone="green">Ready</StatusPill>
              </div>
            </button>
          ))}
        </div>
      </SettingsPanel>
    ),
    Settings: (
      <SettingsPanel title="Settings" subtitle="Application appearance, screen dimensions, and performance preferences.">
        <SliderRow label="UI Scale" value={appSettings.scale} onChange={(value: number) => setAppSettings((prev) => ({ ...prev, scale: value }))} />
        <SliderRow label="Red Accent Strength" value={appSettings.accent} onChange={(value: number) => setAppSettings((prev) => ({ ...prev, accent: value }))} />
        <div className="grid gap-5 md:grid-cols-2">
          <InputBox label="Screen Width" suffix="PX" value={screenSettings.width} onChange={(value: number) => setScreenSettings((prev) => ({ ...prev, width: value }))} />
          <InputBox label="Screen Height" suffix="PX" value={screenSettings.height} onChange={(value: number) => setScreenSettings((prev) => ({ ...prev, height: value }))} />
          <InputBox label="FOV Area X" value={screenSettings.fovX} onChange={(value: number) => setScreenSettings((prev) => ({ ...prev, fovX: value }))} />
          <InputBox label="FOV Area Y" value={screenSettings.fovY} onChange={(value: number) => setScreenSettings((prev) => ({ ...prev, fovY: value }))} />
          <InputBox label="Shooting Delay" suffix="MS" value={screenSettings.delay} onChange={(value: number) => setScreenSettings((prev) => ({ ...prev, delay: value }))} />
          <InputBox label="Frame Rate" suffix="FPS" value={screenSettings.fps} onChange={(value: number) => setScreenSettings((prev) => ({ ...prev, fps: value }))} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">
          <div className="text-sm text-zinc-500">Current Screen Setup</div>
          <div className="mt-2 font-mono text-sm text-white">{screenSettings.width} × {screenSettings.height} · FOV {screenSettings.fovX} × {screenSettings.fovY} · {screenSettings.delay}ms · {screenSettings.fps} FPS</div>
        </div>
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300"><span>Sound Effects</span><Toggle enabled={soundEnabled} onClick={() => { setSoundEnabled((prev) => !prev); notify(soundEnabled ? "Sound effects disabled." : "Sound effects enabled."); }} /></div>
        <div className="rounded-2xl border border-white/10 bg-black/35 p-5 text-zinc-300">Theme: Dark Red · Build: 2.4.1 · Status: Stable</div>
      </SettingsPanel>
    ),
  };

  if (booting) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        <style>{`@keyframes bootPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}} @keyframes loadingBar{0%{width:0%}100%{width:100%}}`}</style>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,.18),transparent_38%),linear-gradient(135deg,#020202,#090909,#130202)]" />
        <div className="relative w-full max-w-xl px-8">
          <div className="mb-10 flex items-center justify-center gap-5"><div className="animate-[bootPulse_2s_ease-in-out_infinite]"><LogoMark /></div><div><div className="text-5xl font-black uppercase tracking-[.35em]">Duelist</div><div className="mt-2 text-sm uppercase tracking-[.35em] text-zinc-500">Loading Modules</div></div></div>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.03] p-6 backdrop-blur-xl">
            <div className="space-y-3 text-sm text-zinc-400"><div className="flex justify-between"><span>Loading modules</span><span className="text-emerald-400">OK</span></div><div className="flex justify-between"><span>Initializing scanner</span><span className="text-emerald-400">OK</span></div><div className="flex justify-between"><span>Authenticating environment</span><span className="text-emerald-400">OK</span></div></div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-red-600 via-red-500 to-white animate-[loadingBar_1.4s_linear_forwards]" /></div>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030303] px-5 text-white">
        <style>{`@keyframes scanner{0%{transform:translateX(-120%)}100%{transform:translateX(900%)}} @keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}`}</style>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(239,68,68,.16),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,.06),transparent_30%),linear-gradient(135deg,#030303,#070707_42%,#130303)]" />
        <GlassCard className="w-full max-w-[520px] animate-[fadeIn_.5s_ease]">
          <div className="p-9 md:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4"><LogoMark /><div><h1 className="text-3xl font-bold uppercase tracking-[.25em]">Duelist</h1><p className="mt-1 text-sm text-zinc-500">Authentication Panel</p></div></div>
              <StatusPill tone="green">500+ active users</StatusPill>
            </div>
            <div className="mb-6 rounded-3xl border border-white/10 bg-black/40 p-5">
              <div className="mb-4 flex items-center gap-3 text-zinc-300"><div className="grid h-10 w-10 place-items-center rounded-2xl border border-red-500/20 bg-red-500/10"><KeyRound className="h-5 w-5 text-red-400" /></div><div><div className="font-semibold text-white">License Authentication</div><div className="text-sm text-zinc-500">Enter your Slotted access key to continue.</div></div></div>
              <input value={licenseKey} onChange={(e) => setLicenseKey(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === "Enter" && authenticateKey()} placeholder="SLOTTED-XXXX-XXXX" className="h-14 w-full rounded-2xl border border-white/10 bg-black/70 px-5 text-lg text-white outline-none transition placeholder:text-zinc-700 focus:border-red-500/60 focus:ring-4 focus:ring-red-500/10" />
              {authError && <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{authError}</div>}
              <Button onClick={authenticateKey} disabled={authStage !== "idle"} className={`mt-5 flex w-full items-center justify-center rounded-2xl border px-5 py-4 font-semibold text-white transition ${authStage === "success" ? "border-emerald-500/40 bg-emerald-500/15" : "border-red-500/35 bg-red-500/10 hover:bg-red-500/15"}`}>
                {authStage === "checking" ? <><span className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-red-400" />Verifying License...</> : authStage === "success" ? <><Check className="mr-2 h-5 w-5 text-emerald-400" />Authenticated</> : <>Authenticate <ChevronRight className="ml-2 h-5 w-5 text-red-400" /></>}
              </Button>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-500"><a href="https://discord.gg/duelistgg" target="_blank" rel="noreferrer" className="transition hover:text-red-400">discord.gg/duelistgg</a><span className="flex items-center gap-2"><Lock className="h-4 w-4" /> Encrypted session</span></div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303] text-white antialiased">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}} @keyframes pulseSoft{0%,100%{opacity:.45}50%{opacity:.9}} @keyframes appReveal{0%{opacity:0;transform:scale(.965) translateY(22px);filter:blur(14px)}55%{opacity:1;filter:blur(0);transform:scale(1.008) translateY(-2px)}100%{opacity:1;transform:scale(1) translateY(0);filter:blur(0)}} @keyframes panelReveal{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(239,68,68,.12),transparent_32%),radial-gradient(circle_at_85%_82%,rgba(255,255,255,.05),transparent_30%),linear-gradient(135deg,#030303,#080808_45%,#120202)]" />
      <div className="fixed left-0 top-0 h-96 w-96 rounded-full bg-red-600/10 blur-[110px] animate-[pulseSoft_5s_ease-in-out_infinite]" />
      <main className={`relative mx-auto flex min-h-screen max-w-[95vw] gap-5 p-4 md:p-6 transition-all duration-700 ${showApp ? "opacity-100" : "opacity-0"}`} style={{ animation: showApp ? "appReveal .75s cubic-bezier(.16,1,.3,1) both" : undefined }}>
        <aside className="hidden w-[290px] shrink-0 overflow-hidden rounded-[32px] border border-white/[.08] bg-white/[.035] backdrop-blur-xl lg:block">
          <div className="flex h-24 items-center gap-4 border-b border-white/[.07] px-7"><LogoMark /><div><div className="text-2xl font-bold uppercase tracking-[.28em]">Duelist</div><div className="mt-1 text-xs uppercase tracking-[.22em] text-zinc-600">Control Center</div></div></div>
          <nav className="space-y-2 p-4">
            {menu.map((item) => {
              const active = activePage === item.label;
              return (
                <button key={item.label} onClick={() => { setActivePage(item.label); notify(`${item.label} opened.`); }} className={`group relative flex h-14 w-full items-center gap-4 rounded-2xl px-4 text-left transition-all duration-300 ${active ? "bg-white/[.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)]" : "text-zinc-500 hover:bg-white/[.035] hover:text-zinc-200"}`}>
                  {active && <span className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-red-500 shadow-[0_0_16px_rgba(239,68,68,.8)]" />}
                  <item.icon className={`h-5 w-5 transition ${active ? "text-red-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
                  <span className="font-semibold">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/[.07] p-5"><div className="rounded-[26px] border border-white/10 bg-black/35 p-4 shadow-[0_10px_40px_rgba(0,0,0,.35)]"><div className="mb-4 flex items-center justify-between"><div><div className="text-xs font-semibold uppercase tracking-[.22em] text-zinc-600">Session</div><div className="mt-1 text-lg font-bold text-white">Secure Connection</div></div><div className="relative"><div className="absolute inset-0 rounded-full bg-emerald-500/30 blur-md" /><div className="relative h-3 w-3 rounded-full bg-emerald-400" /></div></div><div className="flex items-center justify-between rounded-2xl border border-white/[.06] bg-white/[.03] px-4 py-3"><div><div className="text-xs text-zinc-600">Status</div><div className="mt-1 font-semibold text-white">Encrypted · Online</div></div><StatusPill tone="green">Active</StatusPill></div></div></div>
        </aside>
        <section className="min-w-0 flex-1 overflow-hidden rounded-[32px] border border-white/[.08] bg-black/55 backdrop-blur-xl">
          <header className="flex h-24 items-center justify-between border-b border-white/[.07] px-6 md:px-9"><div><p className="text-xs font-semibold uppercase tracking-[.25em] text-red-400">Control Panel</p><h1 className="mt-1 text-2xl font-bold md:text-3xl">{activePage}</h1></div><div className="flex items-center gap-3"><a href="https://discord.gg/duelistgg" target="_blank" rel="noreferrer" className="flex h-11 items-center gap-2 rounded-2xl border border-[#5865F2]/30 bg-[#5865F2]/10 px-4 text-sm font-semibold text-[#c7d2fe] transition hover:bg-[#5865F2]/20 hover:text-white"><img src="https://cdn.simpleicons.org/discord/ffffff" alt="Discord" className="h-4 w-4" /> Support</a><button onClick={() => openModal("Notifications", "No critical alerts. Client status is stable, external mode is active, and all enabled modules are synced.")} className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/[.035] transition hover:bg-white/[.07]"><Bell className="h-5 w-5 text-zinc-300" /></button><button onClick={logout} className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/[.035] px-4 text-sm font-semibold text-zinc-300 transition hover:border-red-500/30 hover:text-white"><LogOut className="h-4 w-4" /> Logout</button></div></header>
          <div className="space-y-6 p-5 md:p-8">
            <div className="flex flex-col justify-between gap-5 rounded-[28px] border border-white/[.08] bg-white/[.035] p-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight md:text-5xl">Duelist Control Center</h2>
                <p className="mt-3 text-zinc-400">{toast} <span className="text-zinc-600">· Enabled features: {enabledCount}/{Object.keys(features).length}</span></p>
              </div>
              <div className="flex flex-wrap gap-3"><StatusPill>Undetected</StatusPill><StatusPill tone="green">External</StatusPill></div>
            </div>

            <button
              onClick={toggleRunning}
              className={`group relative w-full overflow-hidden rounded-[32px] border p-8 text-left transition-all duration-500 ${running ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_70px_rgba(16,185,129,.16)]" : "border-red-500/30 bg-red-500/10 shadow-[0_0_70px_rgba(239,68,68,.10)] hover:bg-red-500/15"}`}
            >
              <div className={`absolute inset-0 opacity-40 ${running ? "bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,.28),transparent_36%)]" : "bg-[radial-gradient(circle_at_20%_0%,rgba(239,68,68,.28),transparent_36%)]"}`} />
              <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <div className={`grid h-20 w-20 place-items-center rounded-[28px] border ${running ? "border-emerald-500/35 bg-emerald-500/10" : "border-red-500/35 bg-red-500/10"}`}>
                    <Zap className={`h-10 w-10 ${running ? "text-emerald-400" : "text-red-400"}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[.32em] text-zinc-500">Main Control</div>
                    <div className="mt-2 text-4xl font-black text-white md:text-5xl">{running ? "RUNNING" : "START TRIGGER BOT"}</div>
                    <div className="mt-2 text-zinc-400">{running ? "Scanner initialized and running with current configuration." : "Press to initialize active scanning state."}</div>
                  </div>
                </div>
                <div className={`rounded-full border px-6 py-3 text-sm font-bold uppercase tracking-[.24em] ${running ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>
                  {running ? "Live" : "Idle"}
                </div>
              </div>
            </button>
            {activePage !== "Dashboard" ? pageContent[activePage] : (
              <>
                <div className="grid gap-5 xl:grid-cols-4">
                  <GlassCard className="p-6"><div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">Subscription</span><Gem className="h-6 w-6 fill-red-500 text-red-500" /></div><div className="text-3xl font-bold text-white">Active License</div><p className="mt-2 text-zinc-500">{subscriptionPlan === "LIFE TIME" ? "LIFE TIME" : "Expires in 29 days"}</p><Button onClick={() => openModal("Subscription", subscriptionPlan === "LIFE TIME" ? "LIFE TIME license active. No expiration date assigned." : "30 DAY license active. Remaining access time: 29 days.")} className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] px-5 py-3 text-sm font-semibold transition hover:bg-white/[.07]">Manage</Button></GlassCard>
                  <GlassCard className="p-6"><div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">System</span><Monitor className="h-6 w-6 text-zinc-300" /></div><div className="text-3xl font-bold text-white">Windows 11</div><p className="mt-2 text-zinc-500">Secure environment</p><div className="mt-6"><StatusPill tone="green">Stable</StatusPill></div></GlassCard>
                  <GlassCard className="p-6"><div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">Last Update</span><Activity className="h-6 w-6 text-red-400" /></div><div className="text-3xl font-bold text-white">May 22, 2026</div><p className="mt-2 text-zinc-500">Version 2.4.1</p><Button onClick={checkUpdates} disabled={checking} className="mt-6 rounded-2xl border border-white/10 bg-white/[.035] px-5 py-3 text-sm font-semibold transition hover:bg-white/[.07] disabled:opacity-60">{checking ? "Checking" : "Check"}</Button></GlassCard>
                  <GlassCard className="p-6"><div className="mb-8 flex items-center justify-between"><span className="text-zinc-400">Runtime Status</span><Activity className="h-6 w-6 text-red-400" /></div><div className="space-y-4"><div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-4"><span className="text-zinc-400">Current Runtime</span><span className="text-2xl font-black text-white">{formattedRuntime}</span></div><div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-4"><span className="text-zinc-400">Scanner State</span><span className={`text-xl font-black ${running ? 'text-emerald-400' : 'text-zinc-500'}`}>{running ? 'Running' : 'Idle'}</span></div></div></GlassCard>
                </div>
                <div className="grid gap-5 xl:grid-cols-[1fr_1.05fr]">
                  <GlassCard className="p-6"><div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-bold">Features</h3><p className="mt-1 text-sm text-zinc-500">Available Modules</p></div><Sparkles className="h-6 w-6 text-red-400" /></div><div className="space-y-3">{Object.entries(features).map(([feature, enabled]) => (<div key={feature} className="group flex items-center gap-4 rounded-2xl border border-white/[.06] bg-black/30 p-4 transition hover:border-red-500/25 hover:bg-white/[.035]"><Crosshair className="h-5 w-5 text-zinc-300" /><button onClick={() => setActivePage(feature)} className="flex-1 text-left font-semibold text-white">{feature}</button><span className={`text-sm font-semibold ${enabled ? "text-red-400" : "text-zinc-600"}`}>{enabled ? "Enabled" : "Disabled"}</span><Toggle enabled={enabled} onClick={() => toggleFeature(feature)} /></div>))}</div></GlassCard>
                  <GlassCard className="p-6"><div className="mb-6 flex items-center justify-between"><div><h3 className="text-xl font-bold">News</h3><p className="mt-1 text-sm text-zinc-500">Recent Changes</p></div><Zap className="h-6 w-6 text-red-400" /></div><div className="space-y-3">{[["Update 2.4.1", "Bug fixes and performance improvements.", "May 22"], ["Update 2.4.0", "New features and optimizations.", "May 15"], ["Update 2.3.9", "Minor fixes.", "May 9"]].map(([title, desc, date]) => (<button key={title} onClick={() => openModal(title, desc)} className="w-full rounded-2xl border border-white/[.06] bg-black/30 p-4 text-left transition hover:border-red-500/25 hover:bg-white/[.035]"><div className="flex justify-between gap-3"><h4 className="font-bold text-white">{title}</h4><span className="text-sm text-zinc-500">{date}</span></div><p className="mt-2 text-sm text-zinc-400">{desc}</p></button>))}</div></GlassCard>
                </div>
                <div className="grid gap-5 xl:grid-cols-[1fr_.8fr]"><GlassCard className="p-6"><div className="mb-5 flex items-center justify-between"><div><h3 className="text-xl font-bold">Activity Log</h3><p className="mt-1 text-sm text-zinc-500">Live system actions</p></div><Activity className="h-5 w-5 text-red-400" /></div><div className="space-y-3">{activityLog.map((log, index) => (<div key={index} className="flex items-center gap-3 rounded-2xl border border-white/[.06] bg-black/30 px-4 py-3 animate-[panelReveal_.35s_ease]"><div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_14px_rgba(239,68,68,.8)]" /><span className="text-sm text-zinc-300">{log}</span></div>))}</div></GlassCard><div className="grid gap-5"><GlassCard className="p-6"><div className="mb-5 flex items-center justify-between"><div><div className="text-sm text-zinc-500">Session Runtime</div><div className="mt-2 text-4xl font-black text-white">{formattedRuntime}</div></div><div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300">LIVE</div></div><div className="h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-white transition-all duration-500" style={{ width: running ? '100%' : '12%' }} /></div><div className="mt-5 flex items-center justify-between text-sm"><span className="text-zinc-500">Status</span><span className="font-bold text-white">{running ? 'Scanner Active' : 'Waiting for start'}</span></div></GlassCard><GlassCard className="p-6"><div className="flex items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-3xl border border-red-500/20 bg-red-500/10"><ShieldCheck className="h-9 w-9 text-red-400" /></div><div><h3 className="text-2xl font-bold">System Ready</h3><p className="mt-1 text-zinc-400">All modules initialized successfully.</p><div className="mt-2"><StatusPill tone="green">Safe to use</StatusPill></div></div></div></GlassCard><GlassCard className="p-6"><div className="flex items-center gap-5"><div className="grid h-16 w-16 place-items-center rounded-3xl border border-red-500/20 bg-red-500/10"><ShieldCheck className="h-9 w-9 text-red-400" /></div><div><h3 className="text-2xl font-bold">External</h3><p className="mt-1 text-zinc-400">Slotted runs externally.</p><div className="mt-2"><StatusPill tone="green">No drivers installed</StatusPill></div></div></div></GlassCard></div></div>
              </>
            )}
            {modal && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm" onClick={() => setModal(null)}><div className="w-full max-w-lg rounded-[28px] border border-white/10 bg-[#070707] p-6 shadow-[0_30px_100px_rgba(0,0,0,.65)]" onClick={(e) => e.stopPropagation()}><div className="mb-4 flex items-center justify-between gap-4"><h3 className="text-2xl font-bold text-white">{modal.title}</h3><button onClick={() => setModal(null)} className="rounded-xl border border-white/10 px-3 py-1 text-zinc-400 transition hover:text-white">×</button></div><p className="whitespace-pre-line text-zinc-400">{modal.body}</p><Button onClick={() => setModal(null)} className="mt-6 w-full rounded-2xl border border-red-500/30 bg-red-500/10 py-3 font-semibold text-white transition hover:bg-red-500/15">Close</Button></div></div>)}
            <footer className="relative flex flex-wrap items-center justify-center gap-5 pt-2 text-sm text-zinc-600"><span>Duelist does not modify any game files.</span><span>|</span><span className="flex items-center gap-2"><Check className="h-4 w-4" /> Session secured.</span><span>|</span><a href="https://discord.gg/duelistgg" target="_blank" rel="noreferrer" className="text-zinc-500 transition hover:text-red-400">discord.gg/duelistgg</a><div className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-pink-500/10 bg-pink-500/[0.05] px-4 py-2 text-xs font-medium text-pink-200 shadow-[0_0_24px_rgba(236,72,153,.08)] md:flex"><span className="h-2 w-2 animate-pulse rounded-full bg-pink-400" />TriggerBot</div></footer>
          </div>
        </section>
      </main>
    </div>
  );
}

