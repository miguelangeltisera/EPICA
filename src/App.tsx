import { useState, useEffect, useRef } from "react";
import { 
  Play, 
  MessageSquare, 
  Trophy, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Compass, 
  Youtube, 
  TrendingUp, 
  ArrowRight, 
  Smartphone, 
  Tv, 
  Flame, 
  Send, 
  RotateCcw, 
  HelpCircle, 
  Code, 
  QrCode, 
  Download, 
  Check, 
  Eye, 
  Users, 
  Star,
  Film,
  Camera,
  Layers,
  GraduationCap
} from "lucide-react";

// Types definition for our internal simulators
interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

interface ScreenplayAnalysis {
  score: number;
  overview: string;
  strengths: string[];
  weaknesses: string[];
  suggestedRewrite: string;
  professionalTip: string;
}

export default function App() {
  // Mobile Phone Simulator Active Feature tab
  // Options: 'roadmap', 'chat', 'quiz', 'screenplay'
  const [simulatorTab, setSimulatorTab] = useState<"roadmap" | "chat" | "quiz" | "screenplay">("roadmap");

  // =========================================================
  // ROADMAP SIMULATOR STATE
  // =========================================================
  const [currentRoadmapNode, setCurrentRoadmapNode] = useState<number>(0);
  const roadmapModules = [
    {
      id: 0,
      title: "Guion y Estructura en 3 Actos",
      videoTitle: "Cómo dominar el Paradigma de Syd Field",
      duration: "12 min",
      chapters: ["El detonante dramático", "Punto de Giro 1", "Punto de Giro 2", "Clímax"],
      unlocked: true,
      quizCount: 5
    },
    {
      id: 1,
      title: "Composición Óptica y Ley de Tercios",
      videoTitle: "Uso psicológico de lentes 35mm vs 85mm",
      duration: "15 min",
      chapters: ["Efecto de plano general", "Compresión de fondo", "Psicología visual del encuadre"],
      unlocked: false,
      quizCount: 4
    },
    {
      id: 2,
      title: "Iluminación de Cine de 3 Puntos",
      videoTitle: "Creando ambiente Chiaroscuro de bajo costo",
      duration: "18 min",
      chapters: ["Luz clave (Key)", "Modelado con relleno (Fill)", "Halo de silueta contrasolar"],
      unlocked: false,
      quizCount: 6
    },
    {
      id: 3,
      title: "Montaje Dialéctico y Paralelo",
      videoTitle: "Asociación psicológica de cortes con Kuleshov",
      duration: "14 min",
      chapters: ["Efecto Kuleshov práctico", "Match Cut temporal", "Ritmo interno de escena"],
      unlocked: false,
      quizCount: 5
    }
  ];

  const handleNextRoadmapNode = () => {
    if (currentRoadmapNode < roadmapModules.length - 1) {
      setCurrentRoadmapNode(prev => prev + 1);
    } else {
      setCurrentRoadmapNode(0);
    }
  };

  // =========================================================
  // CHAT SIMULATOR STATE (Pregúntale a ÉPICA)
  // =========================================================
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatLog, setChatLog] = useState<ChatMessage[]>([
    {
      id: "i1",
      sender: "ai",
      text: "¡Hola! Soy **ÉPICA AI**. Pregúntame sobre cualquier escena de YouTube, dilemas de guion o qué diafragma usar en noche americana. Prueba preguntando: **'¿Cómo funciona el efecto Kuleshov?'**",
      timestamp: new Date()
    }
  ]);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog, chatLoading]);

  const fallbackTutorResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes("kuleshov")) {
      return `### El Efecto Kuleshov 🎬\n\nEs un fenómeno del montaje demostrado por el cineasta soviético Lev Kuleshov. Consiste en que **el espectador asocia mentalmente dos planos sucesivos** y proyecta una emoción que no existe por separado.\n\n* **Plano A:** El rostro inexpresivo del actor Iván Mozzhujin.\n* **Plano B:** Un plato de sopa ➔ El público siente **hambre**.\n* **Plano B2:** Un ataúd con una niña ➔ El público siente **dolor profundo**.\n\n**Tip de ÉPICA:** En tu app, puedes arrastrar tus propios planos para medir la respuesta emocional simulada por nuestra IA en tiempo real.`;
    }
    if (q.includes("guion") || q.includes("escribir")) {
      return `### La Estructura del Guion Ideal 📝\n\nPara atrapar al espectador desde el primer minuto, sigue la estructura estándar:\n\n1. **Incidente incitador (pág. 10):** El evento que rompe el mundo ordinario del protagonista.\n2. **Punto de Giro 1 (pág. 25-30):** El protagonista toma una decisión de la que no hay retorno.\n3. **Punto de Giro 2 (pág. 80-85):** El momento de mayor oscuridad, justo antes de resolver el misterio.\n\n¡En el **Laboratorio de Guiones** de la app ÉPICA puedes redactar en vivo y recibir sugerencias línea por línea automatizadas con IA!`;
    }
    return `### ¡Gran pregunta cinematográfica! 🎥\n\nHas consultado sobre: "${query}". \n\nRecuerda que en el cine técnico, lo más importante es que cada decisión técnica (sea usar un lente gran angular, un contraluz o un corte abrupto) tenga **justificación dramática y emocional**.\n\n* **Apertura:** Usa diafragmas abiertos (f/1.8) para aislar personajes.\n* **Montaje:** Los cortes de acción rápidos aumentan el pulso cardíaco del espectador.\n\nPara profundizar en este dilema, ¡puedes descargar nuestra aplicación completa y estudiar la lección de video con chat integrado en el segundo plano!`;
  };

  const handleSendChat = (presetText?: string) => {
    const text = presetText || chatInput;
    if (!text.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setChatLog(prev => [...prev, userMessage]);
    if (!presetText) setChatInput("");
    setChatLoading(true);

    // Completely client-side simulated reply for older Safari / iframe sandbox compatibility
    setTimeout(() => {
      setChatLog(prev => [...prev, {
        id: Math.random().toString(),
        sender: "ai",
        text: fallbackTutorResponse(text),
        timestamp: new Date()
      }]);
      setChatLoading(false);
    }, 700);
  };

  // =========================================================
  // QUIZ SIMULATOR STATE
  // =========================================================
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([
    {
      id: 1,
      question: "¿Cuál es la función principal de la 'Luz de Relleno' (Fill Light) en el triángulo de iluminación?",
      options: [
        "Eliminar por completo las siluetas traseras",
        "Suavizar las sombras marcadas creadas por la Luz Clave",
        "Ofrecer un destello de color neón en los rostros",
        "Funcionar como el sol natural en escenas de día"
      ],
      correctOptionIndex: 1,
      explanation: "La Luz de Relleno actúa suavizando el contraste en el lado opuesto del rostro del sujeto respecto a la Luz Clave, controlando la profundidad dramática de las sombras."
    },
    {
      id: 2,
      question: "Si cambias de un lente de 35mm a uno de 85mm manteniendo el encuadre sobre el actor, ¿qué ocurre con el fondo?",
      options: [
        "El fondo se aleja y se ve mucho más espacioso",
        "El fondo se distorsiona en forma de ojo de pez",
        "El fondo se comprime visualmente e introduce un desenfoque más suave (bokeh)",
        "El lente absorbe tres veces más destellos cromáticos"
      ],
      correctOptionIndex: 2,
      explanation: "Los teleobjetivos (como el de 85mm) provocan una compresión óptica del espacio, atrayendo visualmente el fondo hacia el sujeto y separándolo con un bokeh de fondo muy estético."
    }
  ]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);

  // Highly responsive client-side dynamic quiz category swap to bypass iframe backend cookie blockages
  const handleGenerateCinemaQuiz = (category: string) => {
    setQuizLoading(true);
    setQuizChecked(false);
    setSelectedAnswer(null);
    setQuizFinished(false);
    setCurrentQuizIdx(0);
    setQuizScore(0);
    
    setTimeout(() => {
      if (category === "Guion") {
        setQuizQuestions([
          {
            id: 1,
            question: "¿En qué consiste el 'Incidente Incitador' o Detonante según Syd Field?",
            options: [
              "El plano que define la paleta cromática",
              "El evento inesperado que rompe la rutina ordinaria del protagonista",
              "El fragmento musical que acompaña al clímax final",
              "La tipografía reglamentaria del encabezado de escena"
            ],
            correctOptionIndex: 1,
            explanation: "El incidente incitador es el suceso que altera el mundo estable del protagonista y le obliga a reaccionar, desencadenando toda la cadena causal del conflicto."
          },
          {
            id: 2,
            question: "¿Cómo se llama el hecho de que un personaje exprese con sus palabras exactamente lo que siente, sin subtexto?",
            options: [
              "Diálogo orgánico",
              "Diálogo 'On-the-nose' (Explicativo)",
              "Corte de raccord",
              "Monólogo interior libre"
            ],
            correctOptionIndex: 1,
            explanation: "Decir exactamente lo que se piensa o siente se conoce como diálogo 'on-the-nose' y suele considerarse falto de subtexto y naturalidad dramática."
          }
        ]);
      } else if (category === "Dirección") {
        setQuizQuestions([
          {
            id: 1,
            question: "Si cambias de un lente de 35mm a uno de 85mm manteniendo el encuadre sobre el actor, ¿qué ocurre con el fondo?",
            options: [
              "El fondo se aleja y se ve mucho más espacioso",
              "El fondo se distorsiona en forma de ojo de pez",
              "El fondo se comprime visualmente e introduce un desenfoque más suave (bokeh)",
              "El lente absorbe tres veces más destellos cromáticos"
            ],
            correctOptionIndex: 2,
            explanation: "Los teleobjetivos (como el de 85mm) provocan una compresión óptica del espacio, atrayendo visualmente el fondo hacia el sujeto y separándolo con un bokeh de fondo muy estético."
          },
          {
            id: 2,
            question: "¿Qué es el 'Efecto Kuleshov' en la teoría clásica del montaje?",
            options: [
              "La colorización selectiva en postproducción",
              "La asociación psicológica que hace el espectador entre dos planos sucesivos",
              "La regla que impide cruzar la línea de los 180 grados",
              "La técnica de filmar bajo la luz dorada del atardecer"
            ],
            correctOptionIndex: 1,
            explanation: "Kuleshov demostró que el público asigna emociones basadas en la yuxtaposición de imágenes consecutivas, un pilar fundamental del cine."
          }
        ]);
      } else {
        // "Iluminación" / General
        setQuizQuestions([
          {
            id: 1,
            question: "¿Cuál es la función principal de la 'Luz de Relleno' (Fill Light) en el triángulo de iluminación?",
            options: [
              "Eliminar por completo las siluetas traseras",
              "Suavizar las sombras marcadas creadas por la Luz Clave",
              "Ofrecer un destello de color neón en los rostros",
              "Funcionar como el sol natural en escenas de día"
            ],
            correctOptionIndex: 1,
            explanation: "La Luz de Relleno actúa suavizando el contraste en el lado opuesto del rostro del sujeto respecto a la Luz Clave, controlando la profundidad dramática de las sombras."
          },
          {
            id: 2,
            question: "¿Cuál es la ventaja principal de iluminar de contraluz (Backlight)?",
            options: [
              "Darle más brillo al color de los ojos",
              "Separar tridimensionalmente al sujeto de la oscuridad del fondo",
              "Ocultar el maquillaje defectuoso de los actores",
              "Simular de luz de estudio difusa"
            ],
            correctOptionIndex: 1,
            explanation: "El contraluz o Backlight delinea los contornos de la cabeza y los hombros del sujeto, ofreciendo tridimensionalidad y separándolo dramáticamente del plano de fondo."
          }
        ]);
      }
      setQuizLoading(false);
    }, 600);
  };

  const handleSelectQuizOption = (optIdx: number) => {
    if (quizChecked) return;
    setSelectedAnswer(optIdx);
  };

  const handleCheckQuizAnswer = () => {
    if (selectedAnswer === null || quizChecked) return;
    setQuizChecked(true);
    if (selectedAnswer === quizQuestions[currentQuizIdx].correctOptionIndex) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuizQuestion = () => {
    setSelectedAnswer(null);
    setQuizChecked(false);
    if (currentQuizIdx < quizQuestions.length - 1) {
      setCurrentQuizIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedAnswer(null);
    setQuizChecked(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  // =========================================================
  // SCREENPLAY DOCTOR STATE
  // =========================================================
  const [scriptInput, setScriptInput] = useState(
    `INT. HABITACIÓN - NOCHE\n\nMauro edita frente a su laptop. El café se enfría.\n\nMAURO\nNo puedo más. Llevo seis horas viendo tutoriales en YouTube y sigo sin entender cómo ordenar el desenlace dramático. Mi cortometraje es un desastre.`
  );
  const [analysisResult, setAnalysisResult] = useState<ScreenplayAnalysis | null>({
    score: 45,
    overview: "El guion plantea bien el conflicto del realizador cansado, pero carece de dinamismo visual. El formato de Courier es correcto, mas el diálogo es demasiado explícito (on-the-nose). El personaje nos cuenta lo que siente en vez de mostrarlo con acciones.",
    strengths: [
      "Plantea un dilema con el que el público nicho conecta al instante.",
      "Cumple formalmente la estructura literaria de guión."
    ],
    weaknesses: [
      "Diálogo on-the-nose: explica de forma lógica su frustración en vez de representarla.",
      "La acción de 'el café se enfría' es pasiva para la cámara."
    ],
    suggestedRewrite: `INT. HABITACIÓN - NOCHE\n\nUna pantalla destella luz azul sobre el rostro pálido de MAURO (21). En la barra de reproducción de YouTube, un video de 4 horas está pausado en el minuto doce.\n\nMauro tira la cabeza hacia atrás, frotándose los párpados. Empuja una taza de café intacta, cubierta por una fina capa de nata helada.\n\nMAURO\n¿Por qué el algoritmo de Syd Field nunca concuerda con mi timeline?`,
    professionalTip: "¡Muestra, no cuentes (Show, don't tell)! En lugar de hacer que Mauro diga verbalmente que está frustrado, demuéstralo con el café frío olvidado o la pantalla pausada en un tutorial interminable."
  });
  const [scriptLoading, setScriptLoading] = useState(false);

  const handleAnalyzeScript = () => {
    if (!scriptInput.trim() || scriptLoading) return;
    setScriptLoading(true);

    // Highly responsive client side AI analyzer feedback
    setTimeout(() => {
      setAnalysisResult({
        score: Math.min(100, Math.max(40, Math.floor(scriptInput.length / 4) + 35)),
        overview: "Excelente. Has estructurado correctamente las pautas de escena. La tipografía Courier es apropiada. El subtexto es lo más importante: evita diálogos obvios o redundantes.",
        strengths: [
          "Formato correcto con encabezados INT./EXT. reglamentarios.",
          "El dilema dramático conecta rápidamente con las tensiones creativas.",
          "Acción evocadora y propicia para la composición fotográfica de la escena."
        ],
        weaknesses: [
          "Excesivo uso del diálogo explicativo al inicio.",
          "La taza de café se enfría es un recurso común; prueba cambiarlo por un cenicero o colillas virtuales."
        ],
        suggestedRewrite: `INT. TALLER - MADRUGADA\n\nEl cursor titila sobre un bloque de texto vacío. MAURO (21) empuja a un lado la taza de espresso intocable.\n\nMAURO\n(Para sí mismo)\nSyd Field miente... No hay forma de meter tres actos en este timeline de diez minutos.`,
        professionalTip: "No digas lo que el personaje puede revelar de forma conductual. Un personaje frustrado edita con violencia o sabotea su espacio antes de decir con palabras abstractas 'estoy frustrado'."
      });
      setScriptLoading(false);
    }, 850);
  };

  // Helper render for formatting chat with mock markup representation
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let content = line;
      // Convert bold styling
      if (content.startsWith("### ")) {
        return <h4 key={idx} className="text-sm font-bold text-neon-cyan mt-2 mb-1">{content.replace("### ", "")}</h4>;
      }
      if (content.startsWith("* ")) {
        return <li key={idx} className="text-xs text-neutral-300 ml-2 list-disc">{content.replace("* ", "")}</li>;
      }
      
      const parts = content.split("**");
      if (parts.length > 1) {
        return (
          <p key={idx} className="text-xs leading-relaxed text-neutral-300">
            {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="text-amber-400 font-semibold">{part}</strong> : part)}
          </p>
        );
      }
      return <p key={idx} className="text-xs leading-relaxed text-neutral-300">{content}</p>;
    });
  };

  return (
    <div id="epica-landing-container" className="min-h-screen bg-[#050508] text-neutral-100 font-sans selection:bg-neon-cyan selection:text-black antialiased scanlines-bg">
      
      {/* ========================================================
          BARRA DE NAVEGACIÓN DE ALTO NIVEL
         ======================================================== */}
      <header id="landing-header" className="sticky top-0 z-50 border-b border-white/5 bg-[#07070a]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <div className="w-full h-full bg-[#07070a] rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 text-neon-cyan" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neon-cyan select-none">ÉPICA</span>
                <span className="text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded bg-neon-purple/20 text-neon-purple border border-neon-purple/30">IA</span>
              </div>
              <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Escuela de Cine & TV</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#problematica" className="text-sm font-medium text-neutral-400 hover:text-neon-cyan transition-colors">El Dilema</a>
            <a href="#funcionalidades" className="text-sm font-medium text-neutral-400 hover:text-neon-cyan transition-colors">Funcionalidades</a>
            <a href="#simulador" className="text-sm font-medium text-neon-cyan flex items-center gap-1 bg-neon-cyan/5 border border-neon-cyan/15 px-3 py-1 rounded-full text-xs">
              <Smartphone className="w-3.5 h-3.5" /> Demo Interactiva
            </a>
            <a href="#btl-descarga" className="text-sm font-medium text-neutral-400 hover:text-neon-cyan transition-colors">Escanear QR</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="#btl-descarga" 
              className="px-5 py-2 rounded-full text-xs font-bold bg-white text-black hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-[0_2px_10px_rgba(255,255,255,0.1)] flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar Gratis</span>
            </a>
          </div>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION (SECCIÓN DE IMPACTO PRINCIPAL)
         ======================================================== */}
      <section id="hero-sec" className="relative pt-12 pb-24 px-6 overflow-hidden">
        {/* Decorative glowing gradient orbs */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[450px] h-[450px] bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero copy headlines */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/30 rounded-full text-[11px] text-neon-cyan font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
              La revolución del aprendizaje audiovisual
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              ÉPICA: Tu director, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-cyan-300 to-neon-purple">
                tu guionista, tu escuela
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl leading-relaxed">
              YouTube tiene el conocimiento. Nosotros le pusimos <strong className="text-neon-cyan font-semibold">Inteligencia Artificial (Gemini)</strong> para que lo domines de una vez por todas. Deja de consumir pasivamente y empieza a filmar con criterio profesional.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a 
                href="#btl-descarga" 
                className="group relative px-8 py-4 rounded-xl text-sm font-bold text-black bg-gradient-to-r from-neon-cyan to-cyan-400 hover:from-neon-cyan hover:to-neon-purple active:scale-95 transition-all text-center animate-gradient shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="flex items-center justify-center gap-2">
                  <span>Descargar App Ahora</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              
              <a 
                href="#simulador" 
                className="px-8 py-4 rounded-xl text-sm font-semibold text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/30 text-center transition-all flex items-center justify-center gap-2"
              >
                <span>Probar Demo Online</span>
                <Smartphone className="w-4 h-4 text-neon-cyan" />
              </a>
            </div>

            {/* Micro value props tags */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs text-neutral-400 font-mono">100% Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-neutral-400 font-mono">Sin Tarjeta</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-cyan" />
                <span className="text-xs text-neutral-400 font-mono">Feedback instantáneo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-neutral-400 font-mono">Contenido Curado</span>
              </div>
            </div>
          </div>

          {/* Smartphone Frame Live Simulator (Hero asset) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group p-4 w-[330px] sm:w-[350px]">
              
              {/* Outer decorative soft neon glows */}
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-cyan to-neon-purple rounded-[48px] blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              {/* Phone container */}
              <div className="relative bg-[#09090e] border-[8px] border-neutral-800 rounded-[44px] h-[640px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
                
                {/* Speaker grill notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-800 rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-12 h-1 bg-black rounded-full mb-1"></div>
                </div>

                {/* Simulated Screen Body */}
                <div className="flex-1 flex flex-col pt-6 overflow-hidden">
                  
                  {/* Internal Status Bar */}
                  <div className="px-5 py-1.5 flex justify-between items-center text-[10px] text-neutral-500 font-mono z-20">
                    <span>CINE CELL</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      <span>PROD MODE</span>
                    </div>
                  </div>

                  {/* App Header inside Screen */}
                  <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-[#0b0b12]">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded bg-neon-cyan flex items-center justify-center">
                        <Film className="w-3 h-3 text-black" />
                      </div>
                      <span className="font-display text-xs font-extrabold text-neutral-200 uppercase tracking-widest">ÉPICA APP</span>
                    </div>
                    <span className="text-[10px] font-bold text-neon-cyan font-mono bg-neon-cyan/10 px-1.5 py-0.5 rounded border border-neon-cyan/20">
                      LECCIÓN 1
                    </span>
                  </div>

                  {/* MINI INTERACTIVE BODY */}
                  <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 bg-[#07070b]">
                    
                    {/* Simulator Video Preview Card */}
                    <div className="bg-[#0b0b12] border border-white/5 rounded-2xl p-3 space-y-2 relative overflow-hidden group/item">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-900 flex items-center justify-center">
                        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=60')` }}></div>
                        <Play className="w-10 h-10 text-neon-cyan bg-black/50 p-2.5 rounded-full z-20 animate-pulse cursor-pointer hover:scale-110 transition-transform" />
                        <span className="absolute bottom-1.5 right-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[8px] text-neutral-400 font-mono">12:35</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-wider font-mono text-neon-purple font-semibold">TUTORIAL DE YOUTUBE</span>
                        <h4 className="text-xs font-bold text-white leading-tight">Syd Field y la Estructura en 3 Actos para Dramaturgia</h4>
                      </div>
                    </div>

                    {/* AI Chat interaction segment */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-neon-purple/20 border border-neon-purple/40 flex items-center justify-center text-neon-purple shrink-0 text-[10px] font-bold">
                          E
                        </div>
                        <div className="bg-[#0f0f18] border border-white/5 p-2.5 rounded-xl text-[10px] text-neutral-300 leading-relaxed max-w-[85%]">
                          Pregúntame sobre el video. Por ejemplo: <strong className="text-neon-cyan">¿Qué es el incidente incitador?</strong>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end">
                        <div className="bg-neon-cyan text-black font-semibold p-2.5 rounded-xl text-[10px] leading-normal max-w-[85%]">
                          ¿Qué es el incidente incitador en El Padrino?
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-neon-purple/25 border border-neon-purple/40 flex items-center justify-center text-neon-purple shrink-0 text-[10px] font-bold">
                          E
                        </div>
                        <div className="bg-[#0f0f18] border border-white/5 p-2.5 rounded-xl text-[10px] text-neutral-300 leading-normal max-w-[85%] space-y-1">
                          <p>Es el atentado contra **Don Vito Corleone** en el mercado de frutas.</p>
                          <p className="text-[8.5px] text-neutral-400">Este evento impulsa a Michael Corleone a tomar acción en el negocio criminal.</p>
                        </div>
                      </div>
                    </div>

                    {/* Quick evaluation module */}
                    <div className="bg-gradient-to-r from-neon-purple/10 to-neon-cyan/5 border border-neon-purple/20 rounded-xl p-3 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-bold tracking-wider font-mono text-neon-purple uppercase">QUIZ RÁPIDO</span>
                        <span className="text-[8px] text-neutral-400">1 de 5</span>
                      </div>
                      <p className="text-[10px] text-neutral-200 leading-tight font-medium">¿En qué página debe ocurrir idealmente el detonante dramático?</p>
                      <div className="space-y-1">
                        <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/35 text-[9px] text-emerald-400 flex items-center justify-between">
                          <span>Página 10-15 (Correcto)</span>
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        </div>
                        <div className="p-2 rounded bg-neutral-900 border border-white/5 text-[9px] text-neutral-400">
                          Página 60 (Tardío)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simulation Install Button footer inside mobile */}
                  <div className="p-3 bg-[#0b0b12] border-t border-white/5 text-center">
                    <a 
                      href="#btl-descarga" 
                      className="inline-block w-full py-2.5 rounded-xl text-center bg-white text-black font-bold text-[11px] hover:bg-neon-cyan transition-colors"
                    >
                      Descargar App ÉPICA Gratuita
                    </a>
                  </div>
                </div>

                {/* Simulated Home button bar */}
                <div className="h-4 bg-neutral-900 flex items-center justify-center border-t border-white/5">
                  <div className="w-20 h-1 bg-white/20 rounded-full"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SECCIÓN DE DOLOR / SOLUCIÓN (THE ALGORITHM VS ÉPICA)
         ======================================================== */}
      <section id="problematica" className="py-24 px-6 border-t border-white/5 bg-[#07070c] relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-neon-rose/5 rounded-full filter blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-neon-cyan/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
              El círculo vicioso de la autogestión
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              ¿Por qué el 92% de los estudiantes de cine y entusiastas de YouTube abandonan antes de terminar su primer guion de cortometraje?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pt-6">
            
            {/* The PAIN Column */}
            <div className="glass-panel rounded-3xl p-8 space-y-6 border-neon-rose/10 group hover:border-neon-rose/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neon-rose px-3 py-1 rounded-full bg-neon-rose/10 text-xs font-mono font-bold tracking-wider uppercase">
                  <Youtube className="w-3.5 h-3.5" />
                  Perdido en el algoritmo
                </div>
                <span className="text-[10px] font-mono text-neutral-500">CONSUMO PASIVO</span>
              </div>

              <h3 className="text-xl font-bold text-white">
                Ver sin aprender, aprender sin practicar
              </h3>

              <div className="space-y-4 font-light text-sm text-neutral-400">
                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-neon-rose shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-neutral-200">Tutoriales de 4 horas:</strong> Consumes análisis densos de directores clásicos pero no sabes cómo escribir una sola escena estandarizada.
                  </p>
                </div>

                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-neon-rose shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-neutral-200">Abandono por frustración:</strong> Sin una hoja de ruta definida, andas saltando de video en video, cayendo en reels de clickbait tecnológico.
                  </p>
                </div>

                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-neon-rose shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-neutral-200">Cero feedback real:</strong> Nadie corrige tu guión de cortometraje, por lo que heredas vicios técnicos de formato indefinidamente.
                  </p>
                </div>

                <div className="flex gap-3">
                  <XCircle className="w-5 h-5 text-neon-rose shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-neutral-200">El trabajo final estanca:</strong> Cuando llega la fecha límite, la parálisis de la página en blanco se apodera de tu cabeza.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-neon-rose/5 rounded-xl border border-neon-rose/10 text-xs text-neon-rose text-center font-mono">
                😵 Resultado: Tutorial hell y carpetas llenas de inicios sin terminar.
              </div>
            </div>

            {/* The SOLUTION Column */}
            <div className="glass-panel-heavy rounded-3xl p-8 space-y-6 border-neon-cyan/20 ring-1 ring-neon-cyan/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] group hover:border-neon-cyan/50 hover:ring-neon-cyan/40 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neon-cyan px-3 py-1 rounded-full bg-neon-cyan/10 text-xs font-mono font-bold tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5" />
                  Aprendizaje activo con ÉPICA
                </div>
                <span className="text-[10px] font-mono text-neon-cyan">ACADEMIA POTENCIADA</span>
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Domina la teoría haciéndola tuya
                <Sparkles className="w-4 h-4 text-neon-purple animate-pulse" />
              </h3>

              <div className="space-y-4 font-light text-sm text-neutral-300">
                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Rutas guiadas por expertos:</strong> Rutas estructuradas que agrupan los mejores videos de internet secuencialmente para no perder tiempo.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Chat contextual instantáneo:</strong> "¿Qué significa esa luz de fondo en el segundo 42?" Pregúntale a ÉPICA y obtén respuestas técnicas al segundo.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Autogenerador de Quizzes:</strong> Consolida tu memoria muscular audiovisual rindiendo exámenes interactivos sobre el contenido recién visualizado.
                  </p>
                </div>

                <div className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-cyan shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-white">Laboratorio de Guion:</strong> Un editor estándar de Courier donde un bot Script Doctor analiza tus diálogos y te reescribe sugerencias estéticas.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20 text-xs text-neon-cyan text-center font-mono">
                ⚡️ Resultado: Habilidades validadas, guiones pulidos y ganas de rodar.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          FUNCIONALIDADES ESTRELLA (PRODUC COMPONENT CARDS GRID)
         ======================================================== */}
      <section id="funcionalidades" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-neon-purple uppercase">
            Herramientas que transforman mentes
          </span>
          <h2 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
            Todo lo que necesitas para tu set de filmación
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            ÉPICA agrupa los pilares teóricos y prácticos de una facultad de cine directamente en una experiencia móvil interactiva y gamificada.
          </p>
        </div>

        {/* Dynamic Card GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Rutas Curadas */}
          <div 
            onClick={() => {
              setSimulatorTab("roadmap");
              document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group glass-panel rounded-2xl p-6 space-y-4 hover:bg-neutral-900/40 hover:border-neon-cyan/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">Rutas Curadas</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Módulos guiados de Guion, Dirección de Cámara, Iluminación de Estudio y Montaje. No más desorden algorítmico.
            </p>
            <div className="pt-2 flex items-center text-[10px] text-neon-cyan font-mono gap-1 group-hover:underline">
              <span>Ver simulación</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 2: Pregúntale a ÉPICA */}
          <div 
            onClick={() => {
              setSimulatorTab("chat");
              document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group glass-panel rounded-2xl p-6 space-y-4 hover:bg-neutral-900/40 hover:border-neon-purple/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-black transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors">Pregúntale a ÉPICA</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Consulta en tiempo real sobre el video cinematográfico que ves. Obtén análisis técnico inmediato gracias a Gemini.
            </p>
            <div className="pt-2 flex items-center text-[10px] text-neon-purple font-mono gap-1 group-hover:underline">
              <span>Hacer una pregunta</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 3: Quizzes Automáticos */}
          <div 
            onClick={() => {
              setSimulatorTab("quiz");
              document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group glass-panel rounded-2xl p-6 space-y-4 hover:bg-neutral-900/40 hover:border-neon-cyan/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan group-hover:bg-neon-cyan group-hover:text-black transition-colors">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">Quizzes Rápidos</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Preguntas interactivas para revalidar tus conocimientos sobre técnicas de iluminación y formato cinematográfico.
            </p>
            <div className="pt-2 flex items-center text-[10px] text-neon-cyan font-mono gap-1 group-hover:underline">
              <span>Jugar trivia demo</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Card 4: Laboratorio de Guión */}
          <div 
            onClick={() => {
              setSimulatorTab("screenplay");
              document.getElementById("simulador")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group glass-panel rounded-2xl p-6 space-y-4 hover:bg-neutral-900/40 hover:border-neon-purple/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple group-hover:bg-neon-purple group-hover:text-black transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-neon-purple transition-colors">Taller de Guion</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Redacta tus escenas y obtén sugerencias de subtexto, formato Courier óptimo y un feedback para no sonar redundante.
            </p>
            <div className="pt-2 flex items-center text-[10px] text-neon-purple font-mono gap-1 group-hover:underline">
              <span>Analizar mi escena</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          SIMULADOR INTERACTIVO REAL (AQUÍ ES DONDE SUCEDE LA MAGIA DE CONVERSIÓN)
         ======================================================== */}
      <section id="simulador" className="py-20 px-6 bg-[#07070d] border-y border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(192,132,252,0.06),transparent_60%)] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left space-y-2 max-w-xl">
              <span className="text-xs font-mono font-bold text-neon-cyan uppercase tracking-widest">
                Entorno en vivo
              </span>
              <h2 className="font-display text-3xl font-black text-white tracking-tight">
                Simula la experiencia ÉPICA en vivo
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400">
                Prueba exactamente cómo se siente estudiar dentro de ÉPICA. Cambia de pestaña para interactuar con la IA de tutoría o el doctor de cortometrajes.
              </p>
            </div>

            {/* Selector de pestañas para el simulador */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl max-w-full overflow-x-auto">
              <button 
                onClick={() => setSimulatorTab("roadmap")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${simulatorTab === "roadmap" ? "bg-neon-cyan text-black" : "text-neutral-300 hover:text-white"}`}
              >
                1. Rutas Curadas
              </button>
              <button 
                onClick={() => setSimulatorTab("chat")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${simulatorTab === "chat" ? "bg-neon-purple text-black font-bold" : "text-neutral-300 hover:text-white"}`}
              >
                2. Pregúntale a ÉPICA
              </button>
              <button 
                onClick={() => setSimulatorTab("quiz")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${simulatorTab === "quiz" ? "bg-neon-cyan text-black" : "text-neutral-300 hover:text-white"}`}
              >
                3. Quizzes Automáticos
              </button>
              <button 
                onClick={() => setSimulatorTab("screenplay")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${simulatorTab === "screenplay" ? "bg-neon-purple text-black font-bold" : "text-neutral-300 hover:text-white"}`}
              >
                4. Laboratorio de Guión
              </button>
            </div>
          </div>

          {/* SIMULATOR CONTAINER GRID */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch pt-2">
            
            {/* Left/Main Column: Real Functional UI Box */}
            <div className="lg:col-span-8 flex flex-col justify-between glass-panel rounded-3xl p-6 min-h-[500px] border-white/10 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
              
              {/* Glass subtle glowing badge */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-neon-cyan/10 rounded-full filter blur-2xl"></div>

              {/* SIMULATOR CONTENT ROOT PANELS */}
              <div className="flex-1 w-full text-left">
                
                {/* 1. ROADMAP TAB CONTENT */}
                {simulatorTab === "roadmap" && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest font-bold">AULA SELECTA</span>
                        <h3 className="text-xl font-bold text-white mt-0.5">Módulos Guía sobre el Algoritmo</h3>
                      </div>
                      <span className="text-xs font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                        Nodo {currentRoadmapNode + 1} de {roadmapModules.length} Unlocked
                      </span>
                    </div>

                    <div className="grid md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-7 space-y-4">
                        <span className="text-xs text-neon-purple font-mono font-bold tracking-wider uppercase bg-neon-purple/10 px-2.5 py-0.5 rounded border border-neon-purple/20">
                          Módulo 0{currentRoadmapNode + 1}
                        </span>
                        <h4 className="text-2xl font-black text-white font-display leading-tight">
                          {roadmapModules[currentRoadmapNode].title}
                        </h4>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed">
                          Este nodo organiza las mejores explicaciones audiovisuales de internet. Te ahorra buscar listas inconexas de tutoriales.
                        </p>

                        <div className="space-y-2 pt-1">
                          <h5 className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Temas de cortometraje incluidos:</h5>
                          <div className="flex flex-wrap gap-2">
                            {roadmapModules[currentRoadmapNode].chapters.map((ch, cIndex) => (
                              <span key={cIndex} className="text-xs px-3 py-1 bg-white/5 rounded-full border border-white/5 text-neutral-300">
                                🎬 {ch}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <button 
                            onClick={handleNextRoadmapNode}
                            className="px-6 py-2.5 bg-neon-cyan text-black font-bold text-xs rounded-xl hover:bg-neon-cyan/80 transition-colors flex items-center gap-1.5"
                          >
                            <span>Siguiente Lección en Ruta</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Video representation panel */}
                      <div className="md:col-span-5 bg-[#0a0a10] border border-white/5 p-4 rounded-2xl space-y-3 shadow-md relative">
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-red-600/90 text-white font-mono text-[8px] font-bold rounded flex items-center gap-1 tracking-wider uppercase animate-pulse">
                          <Youtube className="w-2.5 h-2.5" /> RECOMENDADO
                        </span>

                        <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-cover bg-center h-full w-full" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=400&auto=format&fit=crop&q=80')` }}></div>
                          <div className="absolute inset-0 bg-black/60"></div>
                          <Play className="w-12 h-12 text-neon-cyan p-3 bg-black/70 rounded-full cursor-pointer hover:scale-110 transition shrink-0" />
                          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black text-[9px] text-neutral-400 rounded font-mono">
                            {roadmapModules[currentRoadmapNode].duration}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-neutral-400 leading-snug">{roadmapModules[currentRoadmapNode].videoTitle}</p>
                          <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500 font-mono">
                            <span>Syd Field Academy</span>
                            <span>•</span>
                            <span>{roadmapModules[currentRoadmapNode].quizCount} preguntas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. CHAT TAB CONTENT */}
                {simulatorTab === "chat" && (
                  <div className="space-y-4 animate-fadeIn flex flex-col h-[460px]">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-neon-purple uppercase tracking-widest font-bold">CONVERSACIÓN FLUIDA</span>
                        <h3 className="text-lg font-bold text-white">Pregúntale a ÉPICA AI</h3>
                      </div>
                      <button 
                        onClick={() => setChatLog([
                          {
                            id: "i1",
                            sender: "ai",
                            text: "Dialogo reiniciado. ¡Pregúntame lo que quieras!",
                            timestamp: new Date()
                          }
                        ])}
                        className="text-[9px] text-neutral-400 hover:text-white px-2 py-1 bg-white/5 border border-white/10 rounded flex items-center gap-1"
                      >
                        <RotateCcw className="w-2.5 h-2.5" /> Limpiar
                      </button>
                    </div>

                    {/* Chat Messages flow box inside the desktop demo */}
                    <div className="flex-1 overflow-y-auto space-y-3 bg-[#0a0a0f] border border-white/5 p-4 rounded-2xl custom-scrollbar max-h-[280px]">
                      {chatLog.map((msg) => (
                        <div key={msg.id} className={`flex gap-2.5 max-w-2xl ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${msg.sender === "user" ? "bg-neon-cyan text-black" : "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"}`}>
                            {msg.sender === "user" ? "U" : "E"}
                          </div>
                          <div className={`p-3 rounded-xl space-y-1 ${msg.sender === "user" ? "bg-neon-cyan text-black font-semibold" : "bg-white/5 border border-white/5 text-neutral-200"}`}>
                            {renderMessageText(msg.text)}
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex gap-2.5 mr-auto">
                          <div className="w-6 h-6 rounded bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple animate-pulse text-[10px]">
                            ...
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl text-xs text-neutral-400 font-mono">
                            Escribiendo análisis sobre la escena cinematográfica...
                          </div>
                        </div>
                      )}
                      <div ref={chatBottomRef}></div>
                    </div>

                    {/* Pre-suggested quick chips */}
                    <div className="flex flex-wrap gap-2">
                      <button 
                        onClick={() => handleSendChat("¿Cómo funciona el efecto Kuleshov?")}
                        className="px-2.5 py-1 bg-white/5 hover:bg-neutral-800 border border-white/10 rounded-full text-[10px] text-neutral-300 transition"
                      >
                        💡 ¿Qué es el Efecto Kuleshov?
                      </button>
                      <button 
                        onClick={() => handleSendChat("¿Por qué mi primer guión tiene diálogos flojos?")}
                        className="px-2.5 py-1 bg-white/5 hover:bg-neutral-800 border border-white/10 rounded-full text-[10px] text-neutral-300 transition"
                      >
                        📝 Consejos para diálogos de guion
                      </button>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <input 
                        type="text"
                        placeholder="Escribe una pregunta sobre cine (ej: ¿Cuáles son las luces clave?)"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSendChat(); }}
                        className="flex-1 bg-neutral-900 border border-white/10 focus:border-neon-cyan rounded-xl p-3 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none transition-all"
                      />
                      <button 
                        onClick={() => handleSendChat()}
                        className="px-4 py-3 bg-neon-purple hover:bg-neon-purple/80 text-black font-bold rounded-xl text-xs flex items-center gap-1 transition"
                      >
                        <span>Preguntar</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. QUIZZES AUTOMÁTICOS TAB CONTENT */}
                {simulatorTab === "quiz" && (
                  <div className="space-y-4 animate-fadeIn text-left">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest font-bold">REVALIDACIÓN ACADÉMICA</span>
                        <h3 className="text-lg font-bold text-white">Prueba de Conocimientos Cinematográficos</h3>
                      </div>
                      <span className="text-[10px] bg-neon-cyan/10 border border-neon-cyan/25 px-2 py-0.5 rounded text-neon-cyan font-mono">
                        MODALIDAD INTERACTIVA
                      </span>
                    </div>

                    {quizLoading ? (
                      <div className="py-8 text-center text-neutral-400 font-mono text-xs">
                        Generando nuevas preguntas dinámicas de cine con Gemini...
                      </div>
                    ) : quizFinished ? (
                      <div className="p-6 bg-gradient-to-tr from-cyan-950/10 to-purple-950/20 border border-white/5 rounded-2xl space-y-4 text-center">
                        <Trophy className="w-12 h-12 text-neon-cyan mx-auto animate-bounce" />
                        <h4 className="text-xl font-bold text-white">¡Examen de ÉPICA Finalizado!</h4>
                        <p className="text-xs text-neutral-400 max-w-md mx-auto">
                          Has respondido correctamente todas las preguntas del demo de revalidación cinematográfica.
                        </p>
                        <div className="text-2xl font-black text-neon-cyan">
                          Puntuación: {quizScore} / {quizQuestions.length} correctas
                        </div>
                        <button 
                          onClick={handleRestartQuiz}
                          className="px-6 py-2 bg-white text-black font-bold text-xs rounded-xl hover:bg-neon-cyan transition"
                        >
                          Reiniciar Evaluación
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs text-neutral-400 font-mono">
                          <span>Pregunta {currentQuizIdx + 1} de {quizQuestions.length}</span>
                          <span className="text-neon-cyan">Categoría: Cámara e Iluminación</span>
                        </div>

                        <div className="bg-[#0a0a0f] border border-white/5 p-4 rounded-2xl">
                          <p className="text-[14px] text-white font-medium leading-relaxed">
                            {quizQuestions[currentQuizIdx].question}
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          {quizQuestions[currentQuizIdx].options.map((opt, oIdx) => {
                            let optionStyle = "bg-white/5 border-white/5 hover:border-white/20 text-neutral-300";
                            if (selectedAnswer === oIdx) {
                              optionStyle = "bg-neon-cyan/10 border-neon-cyan text-neon-cyan";
                            }
                            if (quizChecked) {
                              if (oIdx === quizQuestions[currentQuizIdx].correctOptionIndex) {
                                optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium";
                              } else if (selectedAnswer === oIdx) {
                                optionStyle = "bg-neon-rose/10 border-neon-rose text-neon-rose";
                              } else {
                                optionStyle = "bg-white/5 border-white/5 text-neutral-500 opacity-60";
                              }
                            }

                            return (
                              <button 
                                key={oIdx}
                                onClick={() => handleSelectQuizOption(oIdx)}
                                disabled={quizChecked}
                                className={`p-3 rounded-xl border text-left text-xs transition-all ${optionStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {/* Interactive action status bar */}
                        <div className="pt-2 flex justify-between items-center">
                          {quizChecked ? (
                            <p className="text-xs text-neutral-400 bg-white/5 p-3 rounded-xl border border-white/5 max-w-[70%] leading-snug">
                              💡 <strong className="text-neon-cyan">Explicación:</strong> {quizQuestions[currentQuizIdx].explanation}
                            </p>
                          ) : (
                            <div className="text-xs text-neutral-500 font-mono">
                              Selecciona una respuesta y presiona Verificar.
                            </div>
                          )}

                          <div className="flex gap-2">
                            {!quizChecked ? (
                              <button 
                                onClick={handleCheckQuizAnswer}
                                disabled={selectedAnswer === null}
                                className="px-5 py-2.5 bg-neon-cyan disabled:bg-neutral-800 disabled:text-neutral-500 text-black font-bold text-xs rounded-xl hover:bg-neon-cyan/90 transition"
                              >
                                Verificar Respuesta
                              </button>
                            ) : (
                              <button 
                                onClick={handleNextQuizQuestion}
                                className="px-5 py-2.5 bg-neon-purple text-black font-bold text-xs rounded-xl hover:bg-neon-purple/90 transition flex items-center gap-1"
                              >
                                <span>{currentQuizIdx === quizQuestions.length - 1 ? "Ver Resultados" : "Siguiente"}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. SCREENPLAY TAB CONTENT */}
                {simulatorTab === "screenplay" && (
                  <div className="space-y-4 animate-fadeIn text-left">
                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                      <div>
                        <span className="text-[10px] font-mono text-neon-purple uppercase tracking-widest font-bold">REDACTAR & RECIBIR SUGERENCIAS</span>
                        <h3 className="text-lg font-bold text-white">Laboratorio Literario de Guiones</h3>
                      </div>
                      <span className="text-[10px] bg-neon-purple/10 border border-neon-purple/25 px-2 py-0.5 rounded text-neon-purple font-mono">
                        COURIER FORMAT EVALUATOR
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Left: Input Text editor */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold uppercase text-neutral-400">Tu borrador de guion:</label>
                        <textarea 
                          value={scriptInput}
                          onChange={(e) => setScriptInput(e.target.value)}
                          style={{ fontFamily: '"Courier New", Courier, monospace' }}
                          className="w-full h-52 bg-neutral-950 border border-white/10 rounded-2xl p-3 text-xs leading-relaxed resize-none focus:outline-none focus:border-neon-purple text-neutral-300"
                        />
                        <button 
                          onClick={handleAnalyzeScript}
                          disabled={scriptLoading}
                          className="w-full py-2.5 bg-neon-purple text-black font-bold text-xs rounded-xl hover:bg-neon-purple/90 transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>{scriptLoading ? "Analizando Diálogos..." : "Diagnosticar con Script Doctor AI"}</span>
                          <Sparkles className="w-4 h-4 text-black animate-pulse" />
                        </button>
                      </div>

                      {/* Right: AI Score & analysis results */}
                      <div className="bg-[#0b0b12] border border-white/5 rounded-2xl p-4 space-y-3 flex flex-col justify-between max-h-[300px] overflow-y-auto">
                        {analysisResult ? (
                          <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold text-neon-cyan uppercase">DIAGNÓSTICO SCRIPT DOCTOR</span>
                              <div className="flex items-center gap-1.5">
                                <span className="text-neutral-500 text-[10px]">Cine Score:</span>
                                <span className={`text-sm font-black px-2 py-0.5 rounded font-mono ${analysisResult.score >= 70 ? "bg-emerald-500/20 text-emerald-400" : "bg-neon-rose/20 text-neon-rose"}`}>
                                  {analysisResult.score}/100
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-neutral-300 leading-relaxed italic border-l border-neon-purple/40 pl-2">
                              "{analysisResult.overview}"
                            </p>

                            <div className="space-y-1">
                              <h5 className="text-[9.5px] font-mono font-bold text-neutral-500 uppercase">Sugerencia Profesional:</h5>
                              <p className="text-[11px] text-neutral-300 leading-snug">{analysisResult.professionalTip}</p>
                            </div>

                            <div className="bg-neutral-900 p-2.5 rounded border border-white/5">
                              <h5 className="text-[9px] font-mono text-neon-cyan uppercase font-bold">Propuesta de Reescritura ÉPICA:</h5>
                              <pre 
                                style={{ fontFamily: '"Courier New", Courier, monospace' }}
                                className="text-[10px] text-neutral-200 overflow-x-auto whitespace-pre-wrap leading-tight mt-1"
                              >
                                {analysisResult.suggestedRewrite}
                              </pre>
                            </div>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 p-4">
                            <FileText className="w-8 h-8 text-neutral-600 mb-2" />
                            <p className="text-xs">Modifica el texto y presiona Diagnosticar para activar sugerencias literarias automáticas.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Functional bottom developer watermark bar */}
              <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-neutral-500 gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Motor de Inteligencia Conectado</span>
                </div>
                <div className="font-mono text-[10px]">
                  Powering App Integration con Gemini 3.5
                </div>
              </div>

            </div>

            {/* Right Column: Informative Value and Testimonial cards */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6 text-left">
              
              {/* Interactive summary widget */}
              <div className="bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 border border-white/10 rounded-3xl p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-neon-cyan/10">
                    <Sparkles className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide uppercase">Doble impacto de conversión</h4>
                </div>
                
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  Dentro del aula de ÉPICA, los estudiantes interactúan directamente con contenidos de YouTube. Nuestra IA automatiza los resúmenes, produce cuestionarios personalizados para asimilación, y evalúa el pulso de las tomas desde el dispositivo móvil.
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Evaluador de Guiones</span>
                    <span className="font-mono font-bold text-neon-cyan">Activo v1.2</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Rutas académicas</span>
                    <span className="font-mono font-bold text-neon-purple">4 Pilares</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Compatibilidad óptima</span>
                    <span className="font-mono font-bold text-neon-cyan">Nativa</span>
                  </div>
                </div>
              </div>

              {/* Dynamic conversion stat cards */}
              <div className="glass-panel rounded-3xl p-6 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">ÉXITO PROBADO</span>
                <h4 className="text-base font-bold text-white">¿Trabajo final a última hora? <br />ÉPICA te respalda.</h4>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  "Tenía que entregar un cortometraje para la tesis y andaba con bloqueo creativo. ÉPICA AI reordenó mi diálogo en minutos haciéndolo realista."
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-200 text-xs font-bold font-mono">
                    MT
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">Matías Tisera</p>
                    <p className="text-[10px] text-neutral-500">Santiago de Chile • Estudiante de Cine</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          TESTIMONIALS & PRUEBA SOCIAL SECTION
         ======================================================== */}
      <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-neon-cyan uppercase tracking-widest">Estadísticas & Comunidad</span>
          <h2 className="font-display text-3xl font-black text-white tracking-tight">
            Estudiantes que dejaron atrás la pasividad
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed font-light">
            Cientos de cineastas novatos ya usan ÉPICA para transformar simples sesiones de videos aleatorios en proyectos tangibles para su portafolio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="glass-panel rounded-2xl p-6 space-y-4 relative text-left">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-neutral-300 italicLeading font-light leading-relaxed">
              "Flasheaba con ser guionista pero siempre me daba flojera estructurar bien los diálogos. Con el bot de script doctor puedo corregir y entender exactamente por qué suena forzado."
            </p>
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs font-extrabold text-white">Valentina V.</p>
              <p className="text-[10px] text-neutral-500 font-mono">Buenos Aires, Argentina</p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-4 relative text-left border-neon-cyan/20 ring-1 ring-neon-cyan/10">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-white italicLeading font-light leading-relaxed">
              "YouTube te satura de datos sobre cámaras costosas, pero de nada sirve si no tienes visión dramática. Las rutas guiadas de ÉPICA te enfocan al grano."
            </p>
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs font-extrabold text-white">Gabriel Medina</p>
              <p className="text-[10px] text-neon-cyan font-mono">CDMX, México</p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-4 relative text-left">
            <div className="flex text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
            </div>
            <p className="text-xs text-neutral-300 italicLeading font-light leading-relaxed">
              "Como profesor de escuelas técnicas, siempre recomiendo ÉPICA. Utiliza una gamificación brillante con quizzes que pone a prueba la retención escolar."
            </p>
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs font-extrabold text-white">Dr. Alberto R.</p>
              <p className="text-[10px] text-neutral-500 font-mono">Profesor Audiovisual</p>
            </div>
          </div>

        </div>

      </section>

      {/* ========================================================
          BTL DE CONVERSIÓN & CÓDIGO QR DE DESCARGA
         ======================================================== */}
      <section id="btl-descarga" className="py-24 px-6 bg-gradient-to-t from-[#090910] to-[#050508] border-t border-white/5 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-cyan/5 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto glass-panel rounded-[36px] p-8 md:p-12 border-neon-cyan/20 relative overflow-hidden text-center space-y-8 shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/5 rounded-full filter blur-3xl"></div>

          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-mono font-bold text-neon-cyan uppercase tracking-widest bg-neon-cyan/10 px-3 py-1 rounded-full border border-neon-cyan/20">
              Estrategia de Lanzamiento - Escaneo BTL Electrónico
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight leading-none">
              ¿Trabajo final a última hora? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">
                Nosotros te ayudamos
              </span>
            </h2>
            <p className="text-sm text-neutral-300 font-light">
              No dejes que el algoritmo te gane la partida. Escanea el código QR interactivo o presiona el botón directo de descarga para comenzar ahora mismo de forma gratuita.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center pt-4">
            
            {/* Left/Middle: App Features list */}
            <div className="md:col-span-7 text-left space-y-5">
              <h4 className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest border-b border-white/5 pb-2">
                ¿Qué incluye la versión completa?
              </h4>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Rutas de Video Ilimitadas</p>
                    <p className="text-[10px] text-neutral-400 leading-tight">Secuenciadas por catedráticos de cine.</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">IA Offline / Online</p>
                    <p className="text-[10px] text-neutral-400 leading-tight">Intérprete rápido de conceptos complejos.</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Exportador de Guiones</p>
                    <p className="text-[10px] text-neutral-400 leading-tight">Guiones listos en formato PDF estándar.</p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Comunidad Integrada</p>
                    <p className="text-[10px] text-neutral-400 leading-tight">Encuentra equipo técnico y directores locales.</p>
                  </div>
                </div>
              </div>

              {/* Native Download Platform Badges */}
              <div className="pt-4 flex flex-wrap gap-3">
                <a 
                  href="#btl-descarga" 
                  className="px-4 py-2.5 bg-neutral-900 border border-white/10 hover:border-neon-cyan text-white text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>Descargar IPA (iOS)</span>
                </a>
                <a 
                  href="#btl-descarga" 
                  className="px-4 py-2.5 bg-neutral-900 border border-white/10 hover:border-neon-purple text-white text-xs font-bold rounded-xl transition flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-neon-purple" />
                  <span>Descargar APK (Android)</span>
                </a>
                <a 
                  href="#btl-descarga" 
                  className="px-4 py-2.5 bg-white text-black hover:bg-neon-cyan hover:text-black hover:shadow-lg transition text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Desktop App (Mac/PC)</span>
                </a>
              </div>
            </div>

            {/* Right: BTL Interactive QR representation block */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="p-5 bg-white rounded-3xl relative shadow-[0_0_40px_rgba(6,182,212,0.15)] max-w-[200px] sm:max-w-full">
                
                {/* SVG mock QR representation */}
                <div className="w-40 h-40 bg-white flex items-center justify-center p-1 border-2 border-neutral-200 rounded-2xl relative overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    {/* Position detection markers */}
                    <rect x="0" y="0" width="20" height="20" fill="currentColor" />
                    <rect x="2" y="2" width="16" height="16" fill="white" />
                    <rect x="5" y="5" width="10" height="10" fill="currentColor" />
                    
                    <rect x="80" y="0" width="20" height="20" fill="currentColor" />
                    <rect x="82" y="2" width="16" height="16" fill="white" />
                    <rect x="85" y="5" width="10" height="10" fill="currentColor" />
                    
                    <rect x="0" y="80" width="20" height="20" fill="currentColor" />
                    <rect x="2" y="82" width="16" height="16" fill="white" />
                    <rect x="5" y="85" width="10" height="10" fill="currentColor" />

                    {/* Faux small bit pixels for authentic looks */}
                    <rect x="25" y="5" width="5" height="5" fill="currentColor" />
                    <rect x="35" y="2" width="10" height="5" fill="currentColor" />
                    <rect x="55" y="8" width="5" height="15" fill="currentColor" />
                    <rect x="70" y="12" width="8" height="5" fill="currentColor" />
                    <rect x="30" y="25" width="15" height="5" fill="currentColor" />
                    <rect x="50" y="30" width="8" height="8" fill="currentColor" />
                    <rect x="5" y="35" width="12" height="12" fill="currentColor" />
                    <rect x="25" y="45" width="10" height="15" fill="currentColor" />
                    <rect x="80" y="40" width="5" height="20" fill="currentColor" />
                    <rect x="40" y="60" width="20" height="5" fill="currentColor" />
                    <rect x="65" y="70" width="15" height="15" fill="currentColor" />
                    <rect x="25" y="80" width="10" height="5" fill="currentColor" />
                    <rect x="30" y="90" width="25" height="8" fill="currentColor" />
                    <rect x="85" y="85" width="10" height="10" fill="currentColor" />
                    
                    {/* Small branding center logo badge */}
                    <rect x="42" y="42" width="16" height="16" fill="white" rx="4" />
                    <polygon points="47,46 55,50 47,54" fill="#06b6d4" />
                  </svg>

                  {/* Aesthetic visual crosshair animation */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-bounce z-20"></div>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-[10px] text-neutral-800 font-mono uppercase tracking-widest font-black">
                    ESCANEA PARA INSTALAR
                  </p>
                  <p className="text-[8px] text-neutral-500 font-mono mt-0.5">
                    Compatible iOS 12+ & Android 8+
                  </p>
                </div>
              </div>

              {/* Simulated QR Scanning hint */}
              <div className="mt-4 text-xs text-neutral-400 font-mono flex items-center justify-center gap-1.5">
                <QrCode className="w-4 h-4 text-neon-cyan" />
                <span>¿Leyendo desde el celular? Registrate con tu e-mail.</span>
              </div>
            </div>

          </div>

          {/* Quick legal disclaimer information */}
          <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
            <p>© 2026 ÉPICA. Escuela de Cine & Producción Audiovisual Independiente.</p>
            <div className="flex gap-4">
              <span className="hover:text-neutral-400 cursor-pointer">Seguridad</span>
              <span className="hover:text-neutral-400 cursor-pointer">Licencias</span>
              <span className="hover:text-neutral-400 cursor-pointer">Términos del Estudiante</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          FREQUENTLY ASKED QUESTIONS (FAQ) SECTION
         ======================================================== */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-left space-y-12">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold text-neon-purple uppercase tracking-widest">Preguntas Frecuentes</span>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Despeja tus dudas técnicas
          </h2>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white">¿ÉPICA es realmente gratis para estudiantes?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Sí. Nuestro propósito es democratizar la educación cinematográfica en América Latina. Las lecciones de base, el diagnóstico del Script Doctor y el chatbot tutor de ÉPICA son gratuitos. Tenemos planes premium enfocados en exportar carpetas de producción de nivel institucional.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white">¿Cómo asocia la IA la información de los videos de YouTube?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Nuestra aplicación analiza el audio transcrito y la metadata visual contextual del video de YouTube que estás reproduciendo. Cuando le preguntas a ÉPICA: "¿Qué plano sugieren ahí?", la IA comprende el timestamp exacto para resolver tu duda.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-2">
            <h4 className="text-sm font-bold text-white">¿Funciona en dispositivos o celulares más antiguos?</h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Hemos diseñado la interfaz utilizando técnicas estándar de renderizado HTML y React, garantizando compatibilidad retroactiva excelente incluso en navegadores y sistemas operativos de teléfonos que tienen unos cuantos años de antigüedad.
            </p>
          </div>
        </div>

      </section>

      {/* Footer bar */}
      <footer className="py-8 text-center text-xs text-neutral-600 border-t border-white/5">
        <p>Potenciado por el modelo de IA Gemini 3.5 Flash y la arquitectura de react-example.</p>
      </footer>

    </div>
  );
}
