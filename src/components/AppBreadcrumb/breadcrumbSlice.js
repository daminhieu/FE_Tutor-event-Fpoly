import { createSlice } from '@reduxjs/toolkit';

export const HOME_BREADCRUMB = {
    title: "Home",
    path: '/'
}

const initialState = {
    flexBreadcrumb: [HOME_BREADCRUMB]
};

const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState,
    reducers: {
        setFlexBredcrumb: (state, action) => {
            state.flexBreadcrumb = [HOME_BREADCRUMB, ...action.payload]
        },
        resetFlexBredcrumb: () => initialState,
    },
});

export const { setFlexBredcrumb, resetFlexBredcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;

export const getFlexBredcrumb = (state) => state.breadcrumb.flexBreadcrumb;