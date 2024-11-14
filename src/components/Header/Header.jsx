import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */

function HeaderButton({ content, to }) {
  return (
    <li className="font-bold">
      <Link to={to}>{content}</Link>
    </li>
  );
}

export default function Header() {
  return (
    <div className="bg-gray-100 w-full absolute inset-x-0 bg-opacity-30 top-0">
      <header className="flex w-10/12 mx-auto my-0 justify-between h-20 items-center">
        <div>
          <img src="/font_logo.svg" width={100} height={100 / 2.344} />
        </div>
        <div className="flex-1">
          <ul className="flex gap-8 justify-center text-xs md:text-base">
            <HeaderButton content="보이는 ARS" to="/home" />
            <HeaderButton content="M-Z하다" to="/mz" />
            <HeaderButton content="메일 수정 서비스" to="/evaluate" />
          </ul>
        </div>
      </header>
    </div>
  );
}
