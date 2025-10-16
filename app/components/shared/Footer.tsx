import React from 'react'

export default function Footer() {
  return (
    <footer className="footer fixed bottom-0 flex items-center justify-center w-full bg-gray-950 text-gray-100 p-4 lg:w-[calc(100%-18rem)]">
      <div className="text-sm">
        All copyrights © Reserved - {new Date().getFullYear()}
      </div>
    </footer>
  );
}
