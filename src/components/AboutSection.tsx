import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';
import Magnet from './Magnet';

const ABOUT_TEXT =
  "I'm an AI & Data Science student from K.S.Rangasamy College of Technology, passionate about building intelligent applications and data-driven solutions. I work with Machine Learning, Data Analytics, Power BI, and Generative AI — turning ideas into voice assistants, smart dashboards, and impactful digital products. Always learning, always building. Let's create something amazing together!";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F7F1E6] px-5 py-20 sm:px-8 md:px-10"
    >
      {/* Corner decorative 3D images */}
      {/* Left — Jarvis-style 3D Robot Face */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[70px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="https://img.icons8.com/3d-fluency/512/robot-2.png"
          alt="AI Robot"
          className="w-full h-auto drop-shadow-2xl"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>


      {/* Right — 3D Data Analytics */}
      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[150px] md:w-[200px]"
      >
        <img
          src="https://img.icons8.com/3d-fluency/512/combo-chart.png"
          alt="Data Analytics"
          className="w-full h-auto drop-shadow-2xl"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <AnimatedText
            text={ABOUT_TEXT}
            className="max-w-[680px] font-medium leading-relaxed text-[#17130D]/75"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          {/* Skills */}
          <FadeIn delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {[
                {
                  label: 'Languages',
                  items: ['Python', 'Java', 'SQL', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
                },
                {
                  label: 'Frameworks & Libraries',
                  items: ['Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'React', 'Next.js', 'Expo', 'Expo Router', 'React Native', 'Tailwind CSS', 'LangChain'],
                },
                {
                  label: 'Tools & Platforms',
                  items: ['Power BI', 'Tableau', 'Git', 'GitHub', 'VS Code', 'Vercel', 'Supabase'],
                },
                {
                  label: 'AI & GenAI',
                  items: ['Machine Learning', 'Gemini', 'OpenAI', 'OpenRouter', 'Prompt Engineering', 'Speech Recognition', 'Cloud Computing', 'AI Native Development', 'Claude', 'Codex', 'LangChain Agents'],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#5F4A24]/70 sm:w-44 sm:shrink-0 sm:text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#17130D]/10 bg-[#FFFDF7] px-3 py-1 text-sm font-medium text-[#17130D]/75 shadow-sm transition-colors hover:border-[#F4B942] hover:bg-[#F4B942]/20 hover:text-[#17130D]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <Magnet strength={3} padding={80}>
              <ContactButton />
            </Magnet>
          </FadeIn>
        </div>      </div>
    </section>
  );
};

export default AboutSection;
