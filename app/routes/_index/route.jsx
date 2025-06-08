import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { login } from "../../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  const styles = {
    index: {
      minHeight: '100vh',
      background: `
        radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
        linear-gradient(135deg, #000000 0%, #1a1a1a 25%, #2d2d2d 50%, #1a1a1a 75%, #000000 100%)
      `,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)
      `,
      backgroundSize: '50px 50px',
      animation: 'patternMove 20s linear infinite',
      zIndex: 1,
    },
    content: {
      background: `
        linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)
      `,
      backdropFilter: 'blur(20px)',
      borderRadius: '24px',
      padding: '4rem 3rem',
      maxWidth: '650px',
      width: '100%',
      boxShadow: `
        0 32px 64px rgba(0, 0, 0, 0.4),
        0 16px 32px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255, 255, 255, 0.8),
        0 0 0 1px rgba(255, 255, 255, 0.2)
      `,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      animation: 'contentFloat 6s ease-in-out infinite alternate',
      position: 'relative',
      zIndex: 2,
    },
    contentGlow: {
      position: 'absolute',
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
      borderRadius: '26px',
      zIndex: -1,
      animation: 'borderGlow 3s linear infinite',
    },
    heading: {
      fontSize: '3.2rem',
      fontWeight: '900',
      color: '#000000',
      margin: '0 0 1.5rem 0',
      textAlign: 'center',
      lineHeight: '1.1',
      background: 'linear-gradient(135deg, #000000 0%, #333333 50%, #000000 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.02em',
      textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      animation: 'titlePulse 4s ease-in-out infinite',
    },
    text: {
      fontSize: '1.3rem',
      color: '#1a1a1a',
      textAlign: 'center',
      margin: '0 0 3rem 0',
      lineHeight: '1.7',
      fontWeight: '400',
      opacity: 0.9,
    },
    form: {
      background: `
        linear-gradient(145deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)
      `,
      borderRadius: '20px',
      padding: '2.5rem',
      margin: '3rem 0',
      border: '2px solid rgba(0, 0, 0, 0.08)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
    },
    formOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
      transform: 'translateX(-100%)',
      transition: 'transform 0.6s ease',
    },
    label: {
      display: 'block',
      marginBottom: '2rem',
    },
    labelText: {
      display: 'block',
      fontWeight: '700',
      color: '#000000',
      marginBottom: '0.8rem',
      fontSize: '1.1rem',
      letterSpacing: '0.01em',
    },
    input: {
      width: '100%',
      padding: '1.2rem 1.5rem',
      border: '2px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      fontSize: '1.1rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '0.8rem',
      boxSizing: 'border-box',
      color: '#000000',
      fontWeight: '500',
    },
    helperText: {
      fontSize: '0.95rem',
      color: '#666666',
      fontStyle: 'italic',
      fontWeight: '400',
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #000000 100%)',
      color: 'white',
      border: 'none',
      padding: '1.4rem 2rem',
      borderRadius: '12px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      position: 'relative',
      overflow: 'hidden',
    },
    buttonShine: {
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.6s ease',
    },
    list: {
      listStyle: 'none',
      padding: '0',
      margin: '3rem 0 0 0',
    },
    listItem: {
      background: `
        linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)
      `,
      border: '2px solid rgba(0, 0, 0, 0.06)',
      borderRadius: '16px',
      padding: '2rem',
      marginBottom: '1.5rem',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
    },
    listItemGlow: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent, rgba(0,0,0,0.02), transparent)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    listItemStrong: {
      color: '#000000',
      fontWeight: '800',
      fontSize: '1.25rem',
      display: 'block',
      marginBottom: '0.8rem',
      letterSpacing: '0.01em',
    },
    listItemText: {
      color: '#2d2d2d',
      fontSize: '1.05rem',
      lineHeight: '1.6',
      fontWeight: '400',
    },
  };

  const handleFormHover = (e) => {
    e.target.style.transform = 'translateY(-8px) scale(1.02)';
    e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.1)';
    e.target.style.borderColor = 'rgba(0, 0, 0, 0.15)';
    const overlay = e.target.querySelector('.form-overlay');
    if (overlay) overlay.style.transform = 'translateX(100%)';
  };

  const handleFormLeave = (e) => {
    e.target.style.transform = 'translateY(0) scale(1)';
    e.target.style.boxShadow = 'none';
    e.target.style.borderColor = 'rgba(0, 0, 0, 0.08)';
    const overlay = e.target.querySelector('.form-overlay');
    if (overlay) overlay.style.transform = 'translateX(-100%)';
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#000000';
    e.target.style.boxShadow = '0 0 0 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)';
    e.target.style.transform = 'translateY(-2px) scale(1.02)';
    e.target.style.background = 'rgba(255, 255, 255, 1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    e.target.style.boxShadow = 'none';
    e.target.style.transform = 'translateY(0) scale(1)';
    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-4px) scale(1.05)';
    e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(0, 0, 0, 0.2)';
    e.target.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #404040 50%, #1a1a1a 100%)';
    const shine = e.target.querySelector('.button-shine');
    if (shine) shine.style.left = '100%';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0) scale(1)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'linear-gradient(135deg, #000000 0%, #2d2d2d 50%, #000000 100%)';
    const shine = e.target.querySelector('.button-shine');
    if (shine) shine.style.left = '-100%';
  };

  const handleListItemHover = (e) => {
    e.currentTarget.style.transform = 'translateX(12px) translateY(-4px) scale(1.02)';
    e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)';
    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.12)';
    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(250, 252, 254, 0.95) 100%)';
    const glow = e.currentTarget.querySelector('.list-item-glow');
    if (glow) glow.style.opacity = '1';
  };

  const handleListItemLeave = (e) => {
    e.currentTarget.style.transform = 'translateX(0) translateY(0) scale(1)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.06)';
    e.currentTarget.style.background = 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)';
    const glow = e.currentTarget.querySelector('.list-item-glow');
    if (glow) glow.style.opacity = '0';
  };

  return (
    <>
      <style>
        {`
          @keyframes contentFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-8px) rotate(0.5deg); }
          }
          
          @keyframes titlePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          
          @keyframes patternMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          
          @keyframes borderGlow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .responsive-content {
              padding: 2.5rem 2rem !important;
            }
            .responsive-heading {
              font-size: 2.4rem !important;
            }
            .responsive-text {
              font-size: 1.1rem !important;
            }
            .responsive-form {
              padding: 2rem !important;
            }
            .responsive-list-item {
              padding: 1.5rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .responsive-content {
              padding: 2rem 1.5rem !important;
            }
            .responsive-heading {
              font-size: 2rem !important;
            }
            .responsive-form {
              padding: 1.5rem !important;
            }
            .responsive-list-item {
              padding: 1.25rem !important;
            }
          }
        `}
      </style>
      <div style={styles.index}>
        <div style={styles.backgroundPattern}></div>
        <div style={styles.content} className="responsive-content">
          <div style={styles.contentGlow}></div>
          <h1 style={styles.heading} className="responsive-heading">
            Highlight Deals Instantly
          </h1>
          <p style={styles.text} className="responsive-text">
            Turn visitors into buyers with eye-catching promotional banners—just plug and play.
          </p>

          {showForm && (
            <Form
              style={styles.form}
              className="responsive-form"
              method="post"
              action="/auth/login"
              onMouseEnter={handleFormHover}
              onMouseLeave={handleFormLeave}
            >
              <div style={styles.formOverlay} className="form-overlay"></div>
              <label style={styles.label}>
                <span style={styles.labelText}>Shop domain</span>
                <input
                  style={styles.input}
                  type="text"
                  name="shop"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Enter your shop domain..."
                />
                <span style={styles.helperText}>
                  e.g: my-shop-domain.myshopify.com
                </span>
              </label>
              <button
                style={styles.button}
                type="submit"
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
              >
                <div style={styles.buttonShine} className="button-shine"></div>
                Get Started Now
              </button>
            </Form>
          )}
          
          <ul style={styles.list}>
            <li
              style={styles.listItem}
              className="responsive-list-item"
              onMouseEnter={handleListItemHover}
              onMouseLeave={handleListItemLeave}
            >
              <div style={styles.listItemGlow} className="list-item-glow"></div>
              <strong style={styles.listItemStrong}>🚀 Easy Banner Customization</strong>
              <div style={styles.listItemText}>
                Saves time and effort for non-technical merchants, letting them highlight offers instantly.
              </div>
            </li>
            <li
              style={styles.listItem}
              className="responsive-list-item"
              onMouseEnter={handleListItemHover}
              onMouseLeave={handleListItemLeave}
            >
              <div style={styles.listItemGlow} className="list-item-glow"></div>
              <strong style={styles.listItemStrong}>⚡ Automatic Storefront Integration</strong>
              <div style={styles.listItemText}>
                Hassle-free setup with no need to manually edit theme files—just install and activate.
              </div>
            </li>
            <li
              style={{...styles.listItem, marginBottom: '0'}}
              className="responsive-list-item"
              onMouseEnter={handleListItemHover}
              onMouseLeave={handleListItemLeave}
            >
              <div style={styles.listItemGlow} className="list-item-glow"></div>
              <strong style={styles.listItemStrong}>🎯 Boost Sales & Conversion</strong>
              <div style={styles.listItemText}>
                Grabs visitor attention, encourages faster decision-making, and increases order value.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}