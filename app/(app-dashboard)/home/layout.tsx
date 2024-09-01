import Sidebar from './Sidebar';

type Props = {
    children :any
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-4 md:ml-16 lg:ml-64">{children}</main>
    </div>
  );
};

export default Layout;
