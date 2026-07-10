async function translateText(text, targetLang) {
  const azureKey = process.env.AZURE_TRANSLATOR_KEY;
  if (azureKey) {
    const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com';
    const region = process.env.AZURE_TRANSLATOR_REGION;
    const azureTarget = targetLang === 'zh' ? 'zh-Hans' : targetLang;
    const translateUrl = `${endpoint.replace(/\/$/, '')}/translate?api-version=3.0&to=${encodeURIComponent(azureTarget)}`;
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': azureKey
    };
    if (region) {
      headers['Ocp-Apim-Subscription-Region'] = region;
    }

    const response = await fetch(translateUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify([{ text }])
    });

    if (!response.ok) {
      throw new Error(`Azure translation API failed with status ${response.status}`);
    }

    const data = await response.json();
    return data?.[0]?.translations?.[0]?.text || '';
  }

  const endpoint = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
  const apiKey = process.env.LIBRETRANSLATE_API_KEY;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      q: text,
      source: 'auto',
      target: targetLang,
      format: 'text',
      ...(apiKey ? { api_key: apiKey } : {})
    })
  });

  if (!response.ok) {
    throw new Error(`Translation API failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.translatedText || '';
}

module.exports = {
  translateText
};
