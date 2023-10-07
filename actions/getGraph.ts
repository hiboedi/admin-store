import prismaDB from "@/lib/prismaDB";

interface GraphData {
  name: string;
  total: number;
}
export const getGraph = async (storeId: string) => {
  const paidOrders = await prismaDB.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const mounthlyRevenue: { [key: number]: number } = {};

  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueForOrder = 0;

    for (const item of order.orderItems) {
      revenueForOrder += item.product.price;
    }

    mounthlyRevenue[month] = mounthlyRevenue[month] || 0 + revenueForOrder;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "Mei", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Okt", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in mounthlyRevenue) {
    graphData[parseInt(month)].total = mounthlyRevenue[parseInt(month)];
  }
  return graphData;
};
