const Pagination = (props) => {
    const { totalCount, pageSize, siblingCount, currentPage } = props;

    const totalPageCount = Math.ceil(totalCount / pageSize)

}

export default Pagination;