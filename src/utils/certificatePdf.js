export function generateCertificatePdf(cert) {
  // Opens a printable certificate window or triggers print
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Certificate - ${cert.courseTitle}</title>
        <style>
          @page {
            size: landscape;
            margin: 0;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f8fafc;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .certificate {
            background: white;
            border: 14px solid #0f172a;
            padding: 50px 70px;
            width: 1122px;
            height: 866px; /* Aspect ratio 1.294:1 */
            box-sizing: border-box;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            border-radius: 16px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .header {
            font-size: 13px;
            font-weight: bold;
            color: #1e3a8a;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .title {
            font-size: 38px;
            font-weight: 900;
            color: #0f172a;
            margin: 10px 0;
            letter-spacing: -0.5px;
          }
          .recipient {
            font-size: 38px;
            font-weight: bold;
            color: #1e3a8a;
            border-bottom: 3px solid #cbd5e1;
            display: inline-block;
            padding: 0 50px 10px 50px;
            margin: 10px 0;
          }
          .description {
            font-size: 15px;
            color: #475569;
            line-height: 1.5;
            max-width: 750px;
            margin: 10px auto;
          }
          .course-name {
            font-size: 24px;
            font-weight: bold;
            color: #0f2d5c;
            background: #f1f5f9;
            padding: 14px 32px;
            border-radius: 12px;
            display: inline-block;
            margin: 10px 0;
            border: 1px solid #cbd5e1;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
          }
          .signature, .credential {
            text-align: left;
            font-size: 12px;
            color: #64748b;
          }
          .credential strong {
            color: #0f172a;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div>
            <div class="header">Republic of Rwanda · The Hub & NISR Digital Platform</div>
            <div class="title">Certificate of Professional Completion</div>
          </div>

          <div>
            <p class="description">This official digital credential is proudly presented to</p>
            <div class="recipient">${cert.learnerName}</div>
            <p class="description">For successfully mastering all modules, practical assessments, and verified competency benchmarks in:</p>
            <div class="course-name">${cert.courseTitle}</div>
          </div>
          
          <div class="footer">
            <div class="signature">
              <div><strong>${cert.instructorName || 'Academic Course Lead'}</strong></div>
              <div>Certified Instructor & Evaluator</div>
              <div>Date: ${cert.date}</div>
            </div>
            <div class="credential">
              <div>Credential ID: <strong>${cert.certificateId || 'HUB-' + Math.floor(Math.random()*1000000)}</strong></div>
              <div>Level: <strong>${cert.level || 'Level 2: Practitioner'}</strong></div>
              <div>Status: Verified Official</div>
            </div>
          </div>
        </div>
        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
