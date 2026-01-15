import React from "react";

function Footer() {
  return (
    <footer className="border-t bg-white h-40 md:h-36 flex flex-col justify-between">
      
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">

        <div>
          <h2 className="text-lg font-semibold">Rafey Khan</h2>
          <p className="text-sm text-gray-500 mt-2">
            I build reliable digital solutions for modern businesses.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Email: krafey903@gmail.com</li>
            <li>Location: Remote - India</li>
          </ul>
        </div>
         <div className=" py-2 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Rafey Khan. All rights reserved.
      </div>
      </div>
    </footer>
  );
}

export default Footer;
