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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    content: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '3rem',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      animation: 'fadeInUp 0.8s ease-out',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '700',
      color: '#2d3748',
      margin: '0 0 1rem 0',
      textAlign: 'center',
      lineHeight: '1.2',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    text: {
      fontSize: '1.125rem',
      color: '#4a5568',
      textAlign: 'center',
      margin: '0 0 2.5rem 0',
      lineHeight: '1.6',
    },
    form: {
      background: '#f7fafc',
      borderRadius: '12px',
      padding: '2rem',
      margin: '2.5rem 0',
      border: '1px solid #e2e8f0',
      transition: 'all 0.3s ease',
    },
    label: {
      display: 'block',
      marginBottom: '1.5rem',
    },
    labelText: {
      display: 'block',
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '0.5rem',
      fontSize: '0.95rem',
    },
    input: {
      width: '100%',
      padding: '0.875rem 1rem',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      background: 'white',
      marginBottom: '0.5rem',
      boxSizing: 'border-box',
    },
    helperText: {
      fontSize: '0.875rem',
      color: '#718096',
      fontStyle: 'italic',
    },
    button: {
      width: '100%',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    list: {
      listStyle: 'none',
      padding: '0',
      margin: '2.5rem 0 0 0',
    },
    listItem: {
      background: 'white',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      padding: '1.5rem',
      marginBottom: '1rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    listItemStrong: {
      color: '#2d3748',
      fontWeight: '700',
      fontSize: '1.1rem',
      display: 'block',
      marginBottom: '0.5rem',
    },
  };

  const handleFormHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
  };

  const handleFormLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#667eea';
    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
    e.target.style.transform = 'translateY(-1px)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.boxShadow = 'none';
    e.target.style.transform = 'translateY(0)';
  };

  const handleButtonHover = (e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
    e.target.style.background = 'linear-gradient(135deg, #5a67d8, #6b46c1)';
  };

  const handleButtonLeave = (e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = 'none';
    e.target.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
  };

  const handleListItemHover = (e) => {
    e.currentTarget.style.transform = 'translateX(5px)';
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
    e.currentTarget.style.borderColor = '#667eea';
  };

  const handleListItemLeave = (e) => {
    e.currentTarget.style.transform = 'translateX(0)';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = '#e2e8f0';
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @media (max-width: 768px) {
            .responsive-content {
              padding: 2rem 1.5rem !important;
            }
            .responsive-heading {
              font-size: 2rem !important;
            }
            .responsive-text {
              font-size: 1rem !important;
            }
            .responsive-form {
              padding: 1.5rem !important;
            }
            .responsive-list-item {
              padding: 1.25rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .responsive-content {
              padding: 1.5rem 1rem !important;
            }
            .responsive-heading {
              font-size: 1.75rem !important;
            }
            .responsive-form {
              padding: 1rem !important;
            }
          }
        `}
      </style>
      <div style={styles.index}>
        <div style={styles.content} className="responsive-content">
         <h1 style={styles.heading} className="responsive-heading">
  🎉 Highlight Deals Instantly
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
              <label style={styles.label}>
                <span style={styles.labelText}>Shop domain</span>
                <input
                  style={styles.input}
                  type="text"
                  name="shop"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
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
                Log in
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
              <strong style={styles.listItemStrong}>🚀 Easy Banner Customization</strong>
              Saves time and effort for non-technical merchants, letting them highlight offers instantly.
            </li>
            <li
              style={styles.listItem}
              className="responsive-list-item"
              onMouseEnter={handleListItemHover}
              onMouseLeave={handleListItemLeave}
            >
              <strong style={styles.listItemStrong}>⚡ Automatic Storefront Integration
</strong>
              Hassle-free setup with no need to manually edit theme files—just install and activate.
            </li>
            <li
              style={{...styles.listItem, marginBottom: '0'}}
              className="responsive-list-item"
              onMouseEnter={handleListItemHover}
              onMouseLeave={handleListItemLeave}
            >
              <strong style={styles.listItemStrong}>🎯  Boost Sales & Conversion</strong>
             Grabs visitor attention, encourages faster decision-making, and increases order value.


            </li>
          </ul>
        </div>
      </div>
    </>
  );
}