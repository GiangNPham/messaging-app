import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <Spin
        indicator={
          <LoadingOutlined
            style={{
              fontSize: 48,
            }}
            spin
          />
        }
      />
    </div>
  );
}
