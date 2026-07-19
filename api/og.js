export default function handler(req, res) {
  const { data } = req.query;

  if (!data) {
    return res.status(400).json({ error: 'Missing data parameter' });
  }

  let guestName = 'Quý Khách';
  let guestName2 = '';

  // Decode Base64 data (same method as envelope-test.html)
  try {
    console.log('🔍 API/OG DEBUG:');
    console.log('Encoded Data from URL:', data);
    const decodedString = decodeURIComponent(escape(atob(data)));
    console.log('Decoded String:', decodedString);
    const guestInfo = JSON.parse(decodedString);
    console.log('Guest Info:', guestInfo);
    guestName = guestInfo.name || 'Quý Khách';
    guestName2 = guestInfo.name2 || '';
    console.log('Final Guest Name:', guestName);
    console.log('Final Guest Name 2:', guestName2);
  } catch (e) {
    console.error('Error decoding guest data:', e);
  }

  const displayName = guestName;
  const pageTitle = `Thiệp mời cưới - ${displayName}`;
  const ogDescription = `Thanh Hiếu & Hoàng Phương xin trân trọng kính mời ${displayName}`;
  const ogImage = 'https://phuonghieuwedding.vercel.app/image_page/page1.png';

  // Ensure data is properly URL-encoded for safe transmission
  const encodedDataParam = encodeURIComponent(data);
  const ogUrl = `https://phuonghieuwedding.vercel.app/envelope-test.html?data=${encodedDataParam}`;

  const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${pageTitle}">
  <meta property="og:description" content="${ogDescription}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${ogUrl}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${pageTitle}">
  <meta name="twitter:image" content="${ogImage}">

  <script>
    window.location.href = '/envelope-test.html?data=${encodedDataParam}';
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=${ogUrl}">
  </noscript>
</head>
<body>
  <p>Redirecting to invitation...</p>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
