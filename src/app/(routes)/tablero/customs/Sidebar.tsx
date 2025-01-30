// src/components/Sidebar.tsx
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-4 flex flex-col">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-800">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/institutions" className="block p-2 rounded hover:bg-gray-800">
              Instituciones
            </Link>
          </li>
          <li>
            <Link href="/settings" className="block p-2 rounded hover:bg-gray-800">
              Configuración
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
