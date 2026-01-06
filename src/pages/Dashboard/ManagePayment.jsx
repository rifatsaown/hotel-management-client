import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaCheckCircle, FaClock, FaDownload, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManagePayment = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: payments = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payment/allpaymentInfo');
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/payment/${id}`);
      refetch();
      Swal.fire({
        icon: 'success',
        title: 'Approved!',
        text: `Payment approved successfully`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to approve payment',
      });
    }
  };

  const downloadInvoice = (payment) => {
    // Create invoice in PDF format or simple text
    const itemsList =
      payment.itemsName && Array.isArray(payment.itemsName)
        ? payment.itemsName.map((item, i) => `${i + 1}. ${item}`).join('\n')
        : 'No items';

    const invoiceContent = `
INVOICE
=====================================
Transaction ID: ${payment.trxId || 'N/A'}
Date: ${payment.date || 'N/A'}
Customer Email: ${payment.email || 'N/A'}
Status: ${payment.orderStatus || 'N/A'}

ITEMS
=====================================
${itemsList}

SUMMARY
=====================================
Total Items: ${payment.quantity || 0}
Total Amount: $${payment.price ? parseFloat(payment.price).toFixed(2) : '0.00'}

Status: ${payment.orderStatus ? payment.orderStatus.toUpperCase() : 'N/A'}
    `;

    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(invoiceContent)
    );
    element.setAttribute('download', `invoice-${payment.trxId}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const approvedCount = payments.filter(
    (p) => p.orderStatus === 'approved'
  ).length;
  const pendingCount = payments.filter(
    (p) => p.orderStatus !== 'approved'
  ).length;
  const totalRevenue = payments
    .filter((p) => p.orderStatus === 'approved' && p.price)
    .reduce((sum, p) => sum + (parseFloat(p.price) || 0), 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Galaxies Hotel | Manage Payments</title>
      </Helmet>
      <div className="w-full px-4 pb-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
          <p className="text-gray-600">Manage and approve customer payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 text-sm font-medium">
                  Total Payments
                </p>
                <h3 className="text-4xl font-bold mt-2">{payments.length}</h3>
              </div>
              <FaEye className="text-4xl opacity-20" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Approved Payments
                </p>
                <h3 className="text-4xl font-bold mt-2">{approvedCount}</h3>
              </div>
              <FaCheckCircle className="text-4xl opacity-20" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-100 text-sm font-medium">
                  Pending Approval
                </p>
                <h3 className="text-4xl font-bold mt-2">{pendingCount}</h3>
              </div>
              <FaClock className="text-4xl opacity-20" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white shadow-lg">
          <p className="text-purple-100 text-sm font-medium">Total Revenue</p>
          <h2 className="text-4xl font-bold mt-2">
            ${totalRevenue.toFixed(2)}
          </h2>
          <p className="text-purple-100 text-sm mt-2">From approved payments</p>
        </div>

        {/* Payments Table */}
        {payments.length === 0 ? (
          <div className="bg-base-200 rounded-xl p-8 text-center">
            <p className="text-gray-500 text-lg">No payments found</p>
          </div>
        ) : (
          <div className="bg-base-200 rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-base-300">
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Customer Email</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, index) => (
                    <tr key={payment._id} className="hover:bg-base-300">
                      <td className="font-bold">{index + 1}</td>
                      <td>
                        <code className="bg-base-300 px-2 py-1 rounded text-sm">
                          {payment.trxId
                            ? payment.trxId.substring(0, 12)
                            : 'N/A'}
                          ...
                        </code>
                      </td>
                      <td>{payment.email || 'N/A'}</td>
                      <td className="text-sm">
                        {payment.date
                          ? new Date(payment.date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td>
                        <div className="flex flex-col gap-1">
                          {payment.itemsName &&
                          Array.isArray(payment.itemsName) ? (
                            <>
                              {payment.itemsName.slice(0, 2).map((item, i) => (
                                <span key={i} className="badge badge-sm">
                                  {item}
                                </span>
                              ))}
                              {payment.itemsName.length > 2 && (
                                <span className="badge badge-sm badge-outline">
                                  +{payment.itemsName.length - 2} more
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="badge badge-sm">No items</span>
                          )}
                        </div>
                      </td>
                      <td className="font-bold text-lg">
                        $
                        {payment.price
                          ? parseFloat(payment.price).toFixed(2)
                          : '0.00'}
                      </td>
                      <td>
                        {payment.orderStatus === 'approved' ? (
                          <div className="badge badge-success badge-lg">
                            <FaCheckCircle className="mr-1" />
                            Approved
                          </div>
                        ) : (
                          <div className="badge badge-warning badge-lg">
                            <FaClock className="mr-1" />
                            Pending
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {payment.orderStatus !== 'approved' && (
                            <button
                              onClick={() =>
                                handleApprove(payment._id, payment.email)
                              }
                              className="btn btn-sm btn-success text-white"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => downloadInvoice(payment)}
                            className="btn btn-sm btn-info text-white"
                            title="Download Invoice"
                          >
                            <FaDownload />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {payments.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-base-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Average Transaction</span>
                  <span className="font-bold">
                    $
                    {(
                      payments.reduce(
                        (sum, p) => sum + (parseFloat(p.price) || 0),
                        0
                      ) / (payments.length || 1)
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Highest Transaction</span>
                  <span className="font-bold">
                    $
                    {payments.length > 0
                      ? Math.max(
                          ...payments
                            .filter((p) => p.price)
                            .map((p) => parseFloat(p.price) || 0)
                        ).toFixed(2)
                      : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Lowest Transaction</span>
                  <span className="font-bold">
                    $
                    {payments.length > 0
                      ? Math.min(
                          ...payments
                            .filter((p) => p.price)
                            .map((p) => parseFloat(p.price) || 0)
                        ).toFixed(2)
                      : '0.00'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-base-200 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Status Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="badge badge-success"></span>
                    Approved
                  </span>
                  <span className="font-bold">{approvedCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <span className="badge badge-warning"></span>
                    Pending
                  </span>
                  <span className="font-bold">{pendingCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Approval Rate</span>
                  <span className="font-bold">
                    {payments.length > 0
                      ? ((approvedCount / payments.length) * 100).toFixed(1)
                      : '0'}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManagePayment;
