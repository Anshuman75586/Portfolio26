// src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full py-6 flex flex-col items-center bg-white/5 backdrop-blur-xl border-t border-white/10">
      <p className="text-center text-white/60 text-sm mb-2">
        &copy; {year} Anshul Gourkhede All rights reserved.
      </p>
      <div className="flex gap-4">
        <a
          href="https://github.com/Anshuman75586"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1-.02-1.96-3.2.69-3.88-1.55-3.88-1.55-.52-1.32-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.02 1.74 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.41-5.27 5.69.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.12 0 .3.21.65.79.54A10.5 10.5 0 0023.5 12c0-6.27-5.23-11.5-11.5-11.5z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/anshul-gourkhede-b357792aa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.036-1.849-3.036-1.851 0-2.135 1.445-2.135 2.939v5.666H9.358V9h3.414v1.561h.049c.476-.901 1.637-1.849 3.372-1.849 3.604 0 4.27 2.372 4.27 5.456v6.284zM5.337 7.433c-1.144 0-2.067-.928-2.067-2.073 0-1.144.923-2.072 2.067-2.072 1.143 0 2.066.928 2.066 2.072 0 1.145-.923 2.073-2.066 2.073zm1.777 13.019H3.561V9h3.553v11.452zM22.225 0H1.771C.791 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.771 24h20.451C23.207 24 24 23.226 24 22.271V1.728C24 .774 23.207 0 22.225 0z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
