const books = [
  { title: "Pemrograman Web Dasar", description: "Panduan membangun website." },
  { title: "Fisika SMA Kelas 12", description: "Materi fisika dan soal latihan." },
  { title: "Sejarah Indonesia", description: "Sejarah bangsa dari zaman kerajaan." },
  { title: "Matematika Diskrit", description: "Logika, himpunan, graf, dan algoritma." },
  { title: "Bahasa Inggris Akademik", description: "Panduan bahasa Inggris untuk perguruan tinggi." },
  { title: "Kimia Organik Dasar", description: "Konsep dasar reaksi organik." }
];

let selectedBooks = [];

const bookList = document.getElementById('bookList');
const selectedBooksList = document.getElementById('selectedBooksList');
const searchInput = document.getElementById('searchInput');

function renderBooks(bookArray) {
  bookList.innerHTML = "";
  if (bookArray.length === 0) {
    bookList.innerHTML = "<p>Tidak ada buku yang ditemukan.</p>";
    return;
  }

  bookArray.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.description}</p>
      <button onclick="selectBook('${book.title}')">Pilih</button>
    `;
    bookList.appendChild(card);
  });
}

function renderSelectedBooks() {
  selectedBooksList.innerHTML = "";
  if (selectedBooks.length === 0) {
    selectedBooksList.innerHTML = "<li>Belum ada buku yang dipilih.</li>";
    return;
  }
  selectedBooks.forEach((title, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${title}
      <button onclick="removeBook(${index})">Hapus</button>
    `;
    selectedBooksList.appendChild(li);
  });
}

function selectBook(title) {
  if (!selectedBooks.includes(title)) {
    selectedBooks.push(title);
    renderSelectedBooks();
  } else {
    alert("Buku sudah dipilih.");
  }
}

function removeBook(index) {
  selectedBooks.splice(index, 1);
  renderSelectedBooks();
}

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(keyword)
  );
  renderBooks(filtered);
});

renderBooks(books);
renderSelectedBooks();
const suggestionsBox = document.getElementById('suggestions');

searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(keyword)
  );
  renderBooks(filtered);

  // Rekomendasi otomatis
  if (keyword) {
    const suggestions = books
      .filter(book => book.title.toLowerCase().includes(keyword))
      .slice(0, 5);

    showSuggestions(suggestions);
  } else {
    suggestionsBox.style.display = 'none';
  }
});

function showSuggestions(suggestions) {
  if (suggestions.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  suggestionsBox.innerHTML = "";
  suggestions.forEach(suggestion => {
    const div = document.createElement('div');
    div.textContent = suggestion.title;
    div.addEventListener('click', () => {
      searchInput.value = suggestion.title;
      suggestionsBox.style.display = 'none';

      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(suggestion.title.toLowerCase())
      );
      renderBooks(filtered);
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = 'block';
}

// Klik di luar suggestions untuk menutup
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search')) {
    suggestionsBox.style.display = 'none';
  }
});
