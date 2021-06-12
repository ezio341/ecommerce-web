import { Layout } from "antd";

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <hr style={{ maxWidth: 700 }} />
      All rights reserved 2021, Arga Diaz Prawira Yudha -{" "}
      <a href="mailto:argadiaz09@gmail.com" target="#blank">
        E-mail
      </a>{" "}
      -{" "}
      <a href="https://github.com/ezio341" target="#blank">
        GitHub
      </a>
      <br />
      Material Design by{" "}
      <a href="https://ant.design" target="#blank">
        Ant Design
      </a>
      <hr style={{ maxWidth: 200 }} />
    </Footer>
  );
};

export default FooterComponent;
