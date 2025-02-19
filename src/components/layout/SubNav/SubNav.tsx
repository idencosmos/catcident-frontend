// src/components/layout/SubNav/SubNav.tsx
// 현재 Django API로 fetch하지 않는다면, 하드코딩 or remove entirely
export default function SubNav() {
  const subMenuItems = [
    { href: "/about/creator", label: "Creator" },
    { href: "/about/history", label: "History" },
    { href: "/about/characters", label: "Characters" },
    { href: "/about/books", label: "Books" },
    { href: "/about/licensing", label: "Licensing" },
  ];

  return (
    <nav className="border-b bg-muted px-4">
      <ul className="flex space-x-4 text-sm h-10 items-center">
        {subMenuItems.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="hover:text-foreground/80 transition-colors">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}