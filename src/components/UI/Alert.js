function Alert(props) {
  return (
    <div className={`alert alert-popup ${props.className}`} role="alert">
      {props.children}
    </div>
  );
}

export default Alert;
