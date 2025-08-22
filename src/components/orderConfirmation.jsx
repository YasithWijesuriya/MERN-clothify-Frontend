import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";


export default function OrderConfirmation() {
  
  const { id } = useParams();
  const loc = useLocation();
  const { totalPrice, paymentMethod, bankDetails, eta } = loc.state || {};
  const etaDate = eta ? new Date(eta) : new Date(Date.now() + 48 * 60 * 60 * 1000);

 

  return (
    <Card className="p-8 max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Order Received</h2>
      <p>Order ID: <strong>{id}</strong></p>
      <p className="mt-2">Total: <strong>LKR {totalPrice?.toFixed?.(2) ?? "—"}</strong></p>
      <p className="mt-2">Estimated delivery: <strong>{etaDate.toLocaleString()}</strong> (within 48 hours)</p>

      {paymentMethod === "ONLINE" && (
        <div className="mt-4">
          <h4 className="font-semibold">Bank details (sample)</h4>
          <p>Bank: {bankDetails?.bankName}</p>
          <p>Account: {bankDetails?.accountNumber}</p>
          <p>Account Name: {bankDetails?.accountName}</p>
          <p>Branch: {bankDetails?.branch}</p>
          <p className="mt-2">Please transfer the total amount and include the Order ID in the transfer reference. After payment confirm with us to mark the order as PAID.</p>
        </div>
      )}

      {paymentMethod === "CREDIT_CARD" && (
        <div className="mt-4">
          <p>Your card payment was processed. Thank you!</p>
        </div>
      )}

      {paymentMethod === "COD" && (
        <div className="mt-4">
          <p>Payment will be collected on delivery (Cash on Delivery).</p>
        </div>
      )}
    </Card>
  );
}
