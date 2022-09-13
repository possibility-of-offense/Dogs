function NavigationLink(props) {
  return (
    <a
      onClick={props.onClick}
      className={props.className}
      id={props.id && props.id}
      aria-current="page"
      href="#"
      style={props.styling ? props.styling : {}}
    >
      {props.children}
    </a>
  );
}

export default NavigationLink;
