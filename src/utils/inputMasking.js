const inputMask = (type, e, editValue) => {
  if (type === "mobile") {
    if (e) {
      const { value } = e.target;
      let temp = value;
      const x = temp.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return (temp = !x[2]
        ? x[1]
        : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ""}`);
    } if (editValue) {
      let temp = editValue;
      const x = temp.replace(/\D/g, "").match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      return (temp = !x[2]
        ? x[1]
        : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ""}`);
    }
  }
};

export default inputMask;
