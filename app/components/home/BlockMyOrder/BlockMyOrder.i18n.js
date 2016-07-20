export const messages = {
  myOrder: {
    sellerMessageModal: {
      title: {
        rejected: {
          id: 'myOrder.sellerMessageModal.title.rejected',
          defaultMessage: 'Your order has been rejected'
        }
      },
      body: {
        rejected: {
          id: 'myOrder.sellerMessageModal.body.rejected',
          defaultMessage: 'You order has been rejected by seller with message: '
        }
      },
      button: {
        close: {
          id: 'myOrder.sellerMessageModal.button.close',
          defaultMessage: 'Close'
        }
      }
    },
    cancelOrderModal: {
      title: {
        id: 'myOrder.cancelOrderModal.title',
        defaultMessage: 'Cancel order'
      },
      message: {
        id: 'myOrder.cancelOrderModal.message',
        defaultMessage: 'Are you sure you want to cancel this order?'
      },
      button: {
        accept: {
          id: 'myOrder.cancelOrderModal.button.accept',
          defaultMessage: 'OK'
        },
        cancel: {
          id: 'myOrder.cancelOrderModal.button.cancel',
          defaultMessage: 'No'
        }
      }
    },
    button: {
      abort: {
        id: 'myOrder.button.abort',
        defaultMessage: 'Abort'
      }
    },
    emptyOrderList: {
      message: {
        text: {
          id: 'myOrder.emptyOrderList.message.text',
          defaultMessage: 'No active order'
        }
      },
      link: {
        id: 'myOrder.emptyOrderList.link',
        defaultMessage: 'Start shopping.'
      }
    },
    tableFooter: {
      button: {
        next: {
          id: 'orderListFooter.next',
          defaultMessage: 'Next'
        },
        previous: {
          id: 'orderListFooter.previous',
          defaultMessage: 'Previous'
        }
      },
      pageSize: {
        id: 'orderListFooter.pageSize',
        defaultMessage: 'Show'
      },
      pageSizeUnit: {
        id: 'orderListFooter.pageSizeUnit',
        defaultMessage: 'orders'
      }
    },
    tableHead: {
      item: {
        id: 'orderList.tableHead.items',
        defaultMessage: 'Items'
      },
      total: {
        id: 'orderList.tableHead.amount',
        defaultMessage: 'Total Amount'
      },
      time: {
        id: 'orderList.tableHead.time',
        defaultMessage: 'Time'
      },
      finishedTime: {
        id: 'orderList.tableHead.finishedTime',
        defaultMessage: 'Finish time'
      },
      status: {
        id: 'orderList.tableHead.status',
        defaultMessage: 'Status'
      },
      action: {
        id: 'orderList.tableHead.action',
        defaultMessage: 'Action'
      },
      shipAddress: {
        id: 'orderList.tableHead.shipAddress',
        defaultMessage: 'Ship address'
      }
    },
    tableBody: {
      orderStatus: {
        all: {
          id: 'orderList.tableBody.orderStatus.all',
          defaultMessage: 'All'
        },
        new: {
          id: 'orderList.tableBody.orderStatus.new',
          defaultMessage: 'New'
        },
        accepted: {
          id: 'orderList.tableBody.orderStatus.accepted',
          defaultMessage: 'Accepted'
        },
        shipping: {
          id: 'orderList.tableBody.orderStatus.shipping',
          defaultMessage: 'Shipping'
        },
        completed: {
          id: 'orderList.tableBody.orderStatus.completed',
          defaultMessage: 'Completed'
        },
        rejected: {
          id: 'orderList.tableBody.orderStatus.rejected',
          defaultMessage: 'Rejected'
        },
        canceled: {
          id: 'orderList.tableBody.orderStatus.canceled',
          defaultMessage: 'Canceled'
        },
        aborted: {
          id: 'orderList.tableBody.orderStatus.aborted',
          defaultMessage: 'Aborted'
        }
      },
      notFinish: {
        id: 'orderList.tableBody.notFinish',
        defaultMessage: 'N/A'
      }
    }
  }
};
