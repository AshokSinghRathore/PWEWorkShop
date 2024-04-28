import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: [],
  lastElement: null,
};

const CouponSlice = createSlice({
  name: 'Coupon',
  initialState: initialState,
  reducers: {
    setCoupon: (state, action) => {
      return {
        ...action.payload,
      };
    },
    clearCoupon: state => {
      return initialState;
    },
    addCouponRedux: (state, action) => {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    },
    deleteCouponRedux: (state, action) => {
      const newCouponArr = state.data.filter(e => e.id != action.payload);
      return {
        lastElement: state.lastElement,
        data: newCouponArr,
      };
    },
    addPaginatedDataCoupon: (state, action) => {
      return {
        lastElement: action.payload.lastElement,
        data: [...state.data, ...action.payload.data],
      };
    },
    concatCoupon: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  clearCoupon,
  concatCoupon,
  setCoupon,
  addCouponRedux,
  deleteCouponRedux,
  addPaginatedDataCoupon,
} = CouponSlice.actions;
export default CouponSlice;
