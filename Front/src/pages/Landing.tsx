import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { C, CPlusplus, Python, Javascript, Java, CSharp } from "@dev.icons/react";
import { Rocket, BookOpen, CodeAlt, CheckCircle, Code } from '@boxicons/react';
import './Landing.css'

// Componente para placeholder de app real
function AppPlaceholder() {
  return (
    <div className="app-placeholder">
      <img src="./src/assets/Programademy-Preview.png" alt="Vista previa de Programademy" />
    </div>
  )
}

export default function Landing() {
  const navigate = useNavigate();
  const [tokenValido, setTokenValido] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Validar si el token está expirado o no
  useEffect(() => {
    const validarToken = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_URL}/usuario/info`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          setTokenValido(false);
          return;
        }
        setTokenValido(true);
      } catch (err) {
        console.log(err);
        setTokenValido(true);
      }
    };

    validarToken();
  }, []);
  
  // Animar elementos al hacer scroll
  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, []);

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-logo">
          <Code size='md' />
          Programademy
        </div>
        <ul className="nav-links">
          <li><a href="#acerca-de">Acerca de</a></li>
          <li><a href="#caracteristicas">Características</a></li>
          <li><a href="#cursos">Cursos</a></li>
          <li><a href="#lenguajes">Lenguajes</a></li>
        </ul>
        <button className="btn-login" onClick={() => navigate('/login')}>
          {tokenValido ? "Ingresar" : "Iniciar sesión"}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> Aprende. Comprende. Programa.
          </div>
          <h1>
            Aprende programación<br />
            desde sus <span>fundamentos.</span>
          </h1>
          <p>
            Comprende los conceptos una sola vez y descubre
            cómo aplicarlos en múltiples lenguajes.
          </p>

          <div className="hero-langs">
            <div className="lang-chip"><C size={20} /> C</div>
            <div className="lang-chip"><CPlusplus size={20} /> C++</div>
            <div className="lang-chip"><Python size={20} /> Python</div>
            <div className="lang-chip"><Javascript size={20} /> JavaScript</div>
            <div className="lang-chip"><Java size={20} /> Java</div>
            <div className="lang-chip"><CSharp size={20} /> C#</div>
          </div>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate('/register')}>
              Comenzar ahora →
            </button>
            <button className="btn-secondary" onClick={() => navigate('/login')}>
              Explorar cursos
            </button>
          </div>

          <p className="hero-note">
            Diseñado para principiantes. Pensado para todos.
          </p>
        </div>

        <div className="hero-preview">
          <AppPlaceholder/>
        </div>
      </section>

      {/* SOBRE PROGRAMADEMY */}
      <section className="section-about fade-in" id="nosotros">
        <div>
          <span className="section-label">Sobre Programademy</span>
          <h2>Una forma diferente de<br />aprender programación.</h2>
          <p>
            Programademy está diseñada para enseñar los fundamentos
            de la programación antes que la sintaxis de un lenguaje.
            <br /><br />
            Cada módulo explica un concepto de forma clara y después
            muestra su implementación en distintos lenguajes de
            programación.
          </p>
        </div>

        <div className="about-icons" id='acerca-de'>
          <div className="about-icon-card"><Python size={40} /></div>
          <div className="about-icon-card"><Javascript size={40} /></div>
          <div className="about-icon-card center-card">
            <CodeAlt size='lg'/>
          </div>
          <div className="about-icon-card"><Java size={40} /></div>
          <div className="about-icon-card"><C size={40} /></div>
          <div className="about-icon-card"><CPlusplus size={40} /></div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="section-how fade-in" id="caracteristicas">
        <p className="section-label">Cómo funciona</p>
        <h2>Aprende en 3 pasos simples</h2>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-icon purple"><BookOpen /></div>
            <h3>1. Aprende la teoría</h3>
            <p>Cada módulo explica un concepto de forma sencilla, con ejemplos claros y visuales.</p>
          </div>

          <div className="step-card">
            <div className="step-icon blue">
              <CodeAlt />
            </div>
            <h3>2. Compáralo en varios lenguajes</h3>
            <p>Observa el mismo ejemplo en C, C++, Python, JavaScript, Java y C#.</p>
          </div>

          <div className="step-card">
            <div className="step-icon green"><CheckCircle /></div>
            <h3>3. Pon a prueba tus conocimientos</h3>
            <p>Responde cuestionarios al finalizar cada módulo para reforzar lo aprendido.</p>
          </div>
        </div>
      </section>

      {/* LENGUAJES */}
      <section className="section-langs fade-in" id="lenguajes">
        <p className="section-label">Lenguajes soportados</p>
        <h2>Un mismo concepto,<br />diferentes formas de implementarlo.</h2>
        <p className="subtitle">Aprende a pensar en programación, no en sintaxis.</p>

        <div className="langs-grid">
          <div className="langs-grid-chip"><C size={32} /> C</div>
          <div className="langs-grid-chip"><CPlusplus size={32} /> C++</div>
          <div className="langs-grid-chip"><Python size={32} /> Python</div>
          <div className="langs-grid-chip"><Javascript size={32} /> JavaScript</div>
          <div className="langs-grid-chip"><Java size={32} /> Java</div>
          <div className="langs-grid-chip"><CSharp size={32} /> C#</div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-cta fade-in">
        <span className="cta-rocket"><Rocket size={"lg"}/></span>
        <h2>Comienza tu camino en la programación</h2>
        <p>Únete a Programademy y construye tu futuro paso a paso.</p>
        <div className="cta-buttons">
          <button className="btn-primary" onClick={() => navigate('/register')}>
            Crear cuenta gratis
          </button>
          <button className="btn-secondary" onClick={() => navigate('/login')}>
            {tokenValido ? "Explorar cursos" : "Iniciar sesión"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <Code />
              Programademy
            </div>
            <p>
              Aprende programación desde sus fundamentos.
            </p>
            <div className="footer-socials">
              <a className="social-link" href="#" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Plataforma</h4>
            <ul>
              <li><a href="#caracteristicas">Cursos</a></li>
              <li><a href="#cursos">Módulos</a></li>
              <li><a href="#cursos">Quizzes</a></li>
              <li><a href="#lenguajes">Lenguajes</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Recursos</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Guías</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Términos de servicio</a></li>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Política de cookies</a></li>
            </ul>
          </div>

          <div className="footer-col footer-cta-col">
            <h4>¿Listo para empezar?</h4>
            <p>Crea tu cuenta y accede a nuestros cursos gratuitos.</p>
            <button className="btn-primary" onClick={() => navigate('/register')}>
              Comenzar ahora
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 Programademy. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}
