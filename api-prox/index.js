export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await fetch('https://script.google.com/macros/s/AKfycbyf6csLi5pYSYorBq2y5crX7XWZhuwJ42cpdgyC_JNsBu7PVFYwPteoh0Hn8SUL_7vaVQ/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: 'Only POST requests allowed' });
  }
}
