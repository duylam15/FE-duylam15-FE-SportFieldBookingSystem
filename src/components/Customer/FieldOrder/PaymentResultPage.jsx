import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PaymentResultPage = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const statusCode = searchParams.get("statusCode");
    const message = searchParams.get("message");

    if (statusCode === "200") {
      toast.success(message || "Thanh toán thành công!");
    } else {
      toast.error(message || "Thanh toán thất bại!");
    }
  }, [searchParams]);

  return (
    <div>
      <h1>Kết quả Thanh Toán</h1>
      <p>Kiểm tra thông báo để biết thêm chi tiết.</p>
    </div>
  );
};

export default PaymentResultPage;
