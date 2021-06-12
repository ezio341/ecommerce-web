import firebaseApp from "../firebase/App";

export const fetchProduct = () => {
  return (dispatch) => {
    dispatch({
      type: "PRODUCT_GET",
      status: "GET_LOADING",
      loading: true,
    });
    const productRef = firebaseApp.database().ref("/products");
    productRef.on(
      "value",
      (snapshot) => {
        let products = snapshot.val();
        if (products === null) products = [];
        dispatch({
          type: "PRODUCT_GET",
          status: "GET_SUCCESS",
          loading: false,
          products,
        });
      },
      (err) => {
        dispatch({
          type: "PRODUCT_GET",
          status: "GET_FAILED",
          loading: false,
          products: [],
        });
      }
    );
  };
};

export const addProduct = (product) => {
  return (dispatch) => {
    dispatch({
      type: "PRODUCT_ADD",
      status: "ADD_LOADING",
      loading: true,
    });
    const productRef = firebaseApp.database().ref("/products");
    productRef.get().then((snapshot) => {
      let items = snapshot.val();
      if (items === null) {
        items = [];
      }
      items.push(product);
      productRef.set(items).then(
        (val) => {
          dispatch({
            type: "PRODUCT_ADD",
            status: "ADD_SUCCESS",
            loading: false,
          });
        },
        (err) => {
          dispatch({
            type: "PRODUCT_ADD",
            status: "ADD_FAILED",
            loading: false,
          });
        }
      );
    });
  };
};

export const deleteProduct = (id) => {
  return (dispatch) => {
    dispatch({
      type: "PRODUCT_DELETE",
      status: "DELETE_LOADING",
      loading: true,
    });
    const productRef = firebaseApp.database().ref("/products");
    productRef.get().then((snapshot) => {
      let items = snapshot.val();
      productRef
        .set(
          items.filter((item) => {
            return item.id !== id;
          })
        )
        .then(
          (val) => {
            dispatch({
              type: "PRODUCT_DELETE",
              status: "DELETE_SUCCESS",
              loading: false,
            });
          },
          (err) => [
            dispatch({
              type: "PRODUCT_DELETE",
              status: "DELETE_FAILED",
              loading: false,
            }),
          ]
        );
    });
  };
};
export const updateProduct = (product) => {
  return (dispatch) => {
    dispatch({
      type: "PRODUCT_UPDATE",
      status: "UPDATE_LOADING",
      loading: true,
    });
    const productRef = firebaseApp.database().ref("/products");
    productRef.get().then(snapshot=>{
        let oldProducts = snapshot.val()
        let newProducts = oldProducts.map(item=>{
            return item.id == product.id? product:item
        })
        productRef.set(newProducts).then(val=>{
            dispatch({
                type: "PRODUCT_UPDATE",
                status: "UPDATE_SUCCESS",
                loading: false,
            })
        }, err=>[
            dispatch({
                type: "PRODUCT_UPDATE",
                status: "UPDATE_FAILED",
                loading: false,
            })
        ])
    })
  };
};
