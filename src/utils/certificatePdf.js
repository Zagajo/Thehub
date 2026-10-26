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
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f8fafc;
            margin: 0;
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .certificate {
            background: white;
            border: 12px solid #0f172a;
            padding: 60px;
            max-width: 900px;
            width: 100%;
            text-align: center;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            border-radius: 16px;
            position: relative;
          }
          .header {
            font-size: 14px;
            font-weight: bold;
            color: #1e3a8a;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          .title {
            font-size: 36px;
            font-weight: 900;
            color: #0f172a;
            margin: 10px 0 30px 0;
          }
          .recipient {
            font-size: 32px;
            font-weight: bold;
            color: #1e3a8a;
            border-bottom: 3px solid #cbd5e1;
            display: inline-block;
            padding: 0 40px 10px 40px;
            margin: 20px 0;
          }
          .description {
            font-size: 16px;
            color: #475569;
            line-height: 1.6;
            max-width: 650px;
            margin: 20px auto;
          }
          .course-name {
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
            background: #f1f5f9;
            padding: 15px 30px;
            border-radius: 12px;
            display: inline-block;
            margin: 15px 0;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 60px;
            padding-top: 30px;
            border-top: 2px solid #e2e8f0;
          }
          .signature, .credential {
            text-align: left;
            font-size: 13px;
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
          <div class="header">Republic of Rwanda · REB & NISR Digital Hub</div>
          <div class="title">Certificate of Professional Completion</div>
          <p class="description">This is proudly presented to</p>
          <div class="recipient">${cert.learnerName}</div>
          <p class="description">For successfully mastering all modules, practical assessments, and verification benchmarks in:</p>
          <div class="course-name">${cert.courseTitle}</div>
          
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
