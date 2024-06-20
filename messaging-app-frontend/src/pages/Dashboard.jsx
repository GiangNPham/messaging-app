import { Empty, Layout } from "antd";
import { Content } from "antd/es/layout/layout";

export default function Dashboard() {
  return (
    <Layout>
      <Content className="bg-black flex justify-center items-center	">
        <Empty description={false} />
      </Content>
    </Layout>
  );
}
