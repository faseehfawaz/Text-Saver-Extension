document.addEventListener('DOMContentLoaded', function() {
  chrome.storage.local.get({ savedTexts: [] }, function(data) {
    const tableBody = document.getElementById('savedTexts');
    data.savedTexts.forEach(function(item) {
      const row = document.createElement('tr');
      
      const textCell = document.createElement('td');
      textCell.textContent = item.text;
      row.appendChild(textCell);
      
      const urlCell = document.createElement('td');
      const urlLink = document.createElement('a');
      urlLink.href = item.url;
      urlLink.target = '_blank';
      urlLink.textContent = item.url;
      urlCell.appendChild(urlLink);
      row.appendChild(urlCell);
      
      const timestampCell = document.createElement('td');
      timestampCell.textContent = item.timestamp;
      row.appendChild(timestampCell);
      
      tableBody.appendChild(row);
    });
  });

  document.getElementById('downloadButton').addEventListener('click', function() {
    chrome.storage.local.get({ savedTexts: [] }, function(data) {
      const textContent = data.savedTexts.map(item => `"${item.text}" - ${item.url} - ${item.timestamp}\n`).join('');
      downloadTextFile(textContent, 'saved_texts.txt');
    });
  });
});

function downloadTextFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
