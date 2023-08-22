import { Link } from "react-router-dom";
import "./index.css";
import homeIcon from "assets/images/icons/home.svg";
import inventory from "assets/images/icons/inventory.svg";
import contacts from "assets/images/icons/contacts.svg";
import deals from "assets/images/icons/deals.svg";
import accounts from "assets/images/icons/accounts.svg";
import reports from "assets/images/icons/reports.svg";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-nav__item">
          <Link to="/dashboard" className="sidebar-nav__link">
            <img className="sidebar-nav__icon" src={homeIcon} />
            <span>Home</span>
          </Link>
        </li>
        <li className="sidebar-nav__item">
          <Link to="/dashboard/inventory" className="sidebar-nav__link">
            <img className="sidebar-nav__icon" src={inventory} />
            <span>Inventory</span>
          </Link>
        </li>
        <li className="sidebar-nav__item">
          <Link to="/dashboard/contacts" className="sidebar-nav__link">
            <img className="sidebar-nav__icon" src={contacts} />
            <span>Contacts</span>
          </Link>
        </li>
        <li className="sidebar-nav__item">
          <Link to="/dashboard/deals" className="sidebar-nav__link">
            <img className="sidebar-nav__icon" src={deals} />
            <span>Deals</span>
          </Link>
        </li>
        <li className="sidebar-nav__item">
          <Link to="/dashboard/accounts" className="sidebar-nav__link">
            <img className="sidebar-nav__icon" src={accounts} />
            <span>Accounts</span>
          </Link>
        </li>
        <li className="sidebar-nav__item">
          <Link to="/dashboard/reports" className="sidebar-nav__link">
            <img className="sidebar-nav__icon" src={reports} />
            <span>Reports</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
