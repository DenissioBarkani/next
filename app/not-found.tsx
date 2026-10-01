import Link from "next/link";
export default function NotFound() { return <main className="not-found container"><p className="eyebrow">404</p><h1>Этой страницы нет.</h1><Link href="/">Вернуться на главную →</Link></main>; }
