const Logo = ({ container, image }: { container: string; image?: string }) => {
  return (
    <div className={container}>
      <img src='/tgn_logo.png' alt='logo' className={image} />
    </div>
  );
};

export default Logo;
