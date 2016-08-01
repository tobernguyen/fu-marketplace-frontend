export const messages = {
  myOrder: {
    openTicketModal: {
      validation: {
        message: {
          blank: {
            id: 'myOrder.openTicketModal.validation.message.blank',
            defaultMessage: 'Please provide more information'
          },
          long: {
            id: 'myOrder.openTicketModal.validation.message.long',
            defaultMessage: 'Message can\'t be longer than 255 characters'
          }
        }
      },
      asyncMessage: {
        success: {
          id: 'myOrder.openTicketModal.asyncMessage.success',
          defaultMessage: 'Report ticket has been created. Admin will start investigate soon.'
        },
        fail: {
          id: 'myOrder.openTicketModal.asyncMessage.fail',
          defaultMessage: 'Error occured. Report has not been created. Please try again later.'
        }
      },
      title: {
        id: 'myOrder.openTicketModal.title',
        defaultMessage: 'Report'
      },
      subHeader: {
        id: 'myOrder.openTicketModal.subHeader',
        defaultMessage: 'Report order to admin'
      },
      userMessage: {
        title: {
          id: 'myOrder.openTicketModal.userMessage.title',
          defaultMessage: 'Message: '
        },
        placeholder: {
          id: 'myOrder.openTicketModal.userMessage.placeholder',
          defaultMessage: 'Provide more detailed information...'
        }
      },
      button: {
        sendReport: {
          id: 'myOrder.openTicketModal.button.sendReport',
          defaultMessage: 'Report'
        }
      },
      orderInformation: {
        title: {
          id: 'myOrder.openTicketModal.orderInformation.title',
          defaultMessage: 'Order information: '
        },
        fields: {
          orderId: {
            id: 'myOrder.openTicketModal.orderInformation.fields.orderId',
            defaultMessage: 'Order ID: '
          },
          shop: {
            id: 'myOrder.openTicketModal.orderInformation.fields.shop',
            defaultMessage: 'Shop: '
          },
          orderLines: {
            id: 'myOrder.openTicketModal.orderInformation.fields.orderLines',
            defaultMessage: 'Items: '
          },
          shipAddress: {
            id: 'myOrder.openTicketModal.orderInformation.fields.shipAddress',
            defaultMessage: 'Address: '
          },
          createdAt: {
            id: 'myOrder.openTicketModal.orderInformation.fields.createdAt',
            defaultMessage: 'Ordered at: '
          },
          orderStatus: {
            id: 'myOrder.openTicketModal.orderInformation.fields.orderStatus',
            defaultMessage: 'Status: '
          }
        }
      }
    },
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
          defaultMessage: 'Yes'
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
      },
      report: {
        id: 'myOrder.button.report',
        defaultMessage: 'Report'
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
      shop: {
        id: 'orderList.tableHead.shop',
        defaultMessage: 'Shop'
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
