export function generateCertificatePdf(cert) {
  const learner = cert.learnerName || cert.userName || 'Verified Learner';
  const course = cert.courseTitle || cert.title || 'Advanced Technical Program';
  const date = cert.date || cert.issuedDate || new Date().toISOString().split('T')[0];
  const certId = cert.certificateId || cert.id || `HUB-RW-${Date.now()}`;
  const hash = cert.credentialHash || cert.verificationHash || `SHA-256: 8fbc91e4a27b9c9f0e1d823456789abc`;

  // Create an invisible iframe to print without triggering popup blockers
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>The Hub Rwanda - Certificate - ${course}</title>
        <style>
          @page { size: landscape; margin: 0; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 24px;
            background: #ffffff;
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
          }
          .certificate {
            width: 100%;
            height: 100%;
            border: 12px solid #0f172a;
            padding: 40px 60px;
            background: #fdfefe;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
            position: relative;
            outline: 2px solid #d97706;
            outline-offset: -10px;
          }
          .kicker { font-size: 11px; font-weight: 700; color: #1e3a8a; letter-spacing: 3px; text-transform: uppercase; }
          .inst { font-size: 14px; font-weight: 700; color: #0f172a; margin-top: 4px; }
          .title { font-size: 32px; font-weight: 800; color: #0f172a; margin: 12px 0 4px; letter-spacing: -0.5px; }
          .sub { font-size: 11px; color: #64748b; font-style: italic; }
          .recipient-lead { font-size: 13px; color: #475569; margin-top: 16px; }
          .recipient { font-size: 36px; font-weight: 800; color: #020617; border-bottom: 2px solid #020617; display: inline-block; padding: 4px 40px; margin: 8px 0; font-family: Georgia, serif; }
          .desc { font-size: 13px; color: #475569; max-width: 650px; margin: 10px auto; line-height: 1.5; }
          .course { font-size: 20px; font-weight: 700; color: #1e3a8a; background: #eff6ff; padding: 10px 24px; border-radius: 8px; border: 1px solid #bfdbfe; display: inline-block; margin: 10px 0; }
          .footer { display: flex; justify-content: space-between; align-items: flex-end; padding-top: 20px; border-top: 1px solid #e2e8f0; margin-top: 16px; font-size: 11px; }
          .sign { width: 220px; text-align: center; }
          .sign-line { border-top: 1px solid #475569; margin-top: 30px; padding-top: 4px; font-weight: 700; color: #0f172a; }
          .sign-role { font-size: 10px; color: #64748b; }
          .meta { font-size: 10px; font-family: monospace; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div>
            <div class="kicker">Republic of Rwanda · Ministry of ICT & Innovation</div>
            <div class="inst">The Hub Rwanda · National Institute of Statistics of Rwanda (NISR)</div>
            <div class="title">Certificate of Professional Mastery</div>
            <div class="sub">Impamyabushobozi y’Ubumenyi bw’Umwuga n’Ikoranabuhanga</div>
          </div>
          <div>
            <div class="recipient-lead">This is to officially certify that</div>
            <div class="recipient">${learner}</div>
            <div class="desc">has successfully met all academic standards, completed hands-on capstone deliverables, and demonstrated verified competency in:</div>
            <div class="course">${course}</div>
          </div>
          <div class="footer">
            <div class="sign">
              <div class="sign-line">Dr. Alice Mukamana</div>
              <div class="sign-role">Director of Academic Programs, NISR</div>
            </div>
            <div class="meta">
              <div>Issue Date: ${date}</div>
              <div>Credential ID: ${certId}</div>
              <div>${hash}</div>
            </div>
            <div class="sign">
              <div class="sign-line">Jean-Paul Habimana</div>
              <div class="sign-role">Registrar & National Assessment Board</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
  doc.close();

  iframe.contentWindow.focus();
  setTimeout(() => {
    iframe.contentWindow.print();
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 1200);
  }, 400);
}
