export const messages = {
  formChangeTicketStatus: {
    relatedSection: {
      sectionName: {
        id: 'formChangeTicketStatus.relatedSection.sectionName',
        defaultMessage: 'Related information'
      },
      sectionDescription: {
        id: 'formChangeTicketStatus.relatedSection.sectionDescription',
        defaultMessage: 'Information of this case provided by user'
      },
      fields: {
        userNote: {
            id: 'formChangeTicketStatus.relatedSection.fields.userNote',
            defaultMessage: 'User note'
        }
      }
    },
    orderSection: {
      sectionName: {
        id: 'formChangeTicketStatus.orderSection.sectionName',
        defaultMessage: 'Order information'
      },
      sectionDescription: {
        id: 'formChangeTicketStatus.orderSection.sectionDescription',
        defaultMessage: 'Addition information of order that reported by this case'
      },
      fields: {
        orderId: {
          id: 'formChangeTicketStatus.orderSection.fields.orderId',
          defaultMessage: 'Order ID'
        },
        orderStatus: {
          id: 'formChangeTicketStatus.orderSection.fields.orderStatus',
          defaultMessage: 'Order Status'
        },
        createdAt: {
          id: 'formChangeTicketStatus.orderSection.fields.createdAt',
          defaultMessage: 'Ordered at'
        },
        item: {
          id: 'formChangeTicketStatus.orderSection.fields.item',
          defaultMessage: 'Items: '
        },
        itemTable: {
          item: {
            id: 'formChangeTicketStatus.orderSection.fields.itemTable.item',
            defaultMessage: 'Item'
          },
          quantity: {
            id: 'formChangeTicketStatus.orderSection.fields.itemTable.quantity',
            defaultMessage: 'quantity'
          },
          note: {
            id: 'formChangeTicketStatus.orderSection.fields.itemTable.note',
            defaultMessage: 'Note'
          }
        }
      }
    },
    shopSection: {
      sectionName: {
        id: 'formChangeTicketStatus.shopSection.sectionName',
        defaultMessage: 'Shop information'
      },
      sectionDescription: {
        id: 'formChangeTicketStatus.shopSection.sectionDescription',
        defaultMessage: 'Information of shop that reported by this case'
      },
      fields: {
        shopName: {
          id: 'formChangeTicketStatus.shopSection.fields.shopName',
          defaultMessage: 'Shop name'
        },
        seller: {
          id: 'formChangeTicketStatus.shopSection.fields.seller',
          defaultMessage: 'Seller'
        },
        phone: {
          id: 'formChangeTicketStatus.shopSection.fields.phone',
          defaultMessage: 'Phone'
        },
        sellerPhone: {
          id: 'formChangeTicketStatus.shopSection.fields.sellerPhone',
          defaultMessage: 'Seller phone'
        },
        sellerEmail: {
          id: 'formChangeTicketStatus.shopSection.fields.sellerEmail',
          defaultMessage: 'Seller email'
        }
      }
    },
    userSection: {
      sectionName: {
        id: 'formChangeTicketStatus.userSection.sectionName',
        defaultMessage: 'Reporter information'
      },
      sectionDescription: {
        id: 'formChangeTicketStatus.userSection.sectionDescription',
        defaultMessage: 'Information of user who report this case'
      },
      fields: {
        fullName: {
          id: 'formChangeTicketStatus.userSection.fields.fullName',
          defaultMessage: 'Full name'
        },
        phone: {
          id: 'formChangeTicketStatus.userSection.fields.phone',
          defaultMessage: 'Phone'
        },
        email: {
          id: 'formChangeTicketStatus.userSection.fields.email',
          defaultMessage: 'Email'
        }
      },
      message: {
        noPhone: {
          id: 'formChangeTicketStatus.userSection.message.noPhone',
          defaultMessage: 'User has not provide phone number'
        }
      }
    }
  }
};
