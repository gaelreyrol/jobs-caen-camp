const {
    filtersSanitizer,
    formatPaginationToLinkHeader,
    paginationSanitizer,
    sortSanitizer,
} = require('./sanitizers');

describe('Sanitizers', () => {
    describe('filtersSanitizer', () => {
        it('should return an empty array if query filters are not set', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(undefined, defaultFilterableFields)
            ).toEqual([]);
        });

        it('should remove all unfiltrable fields from query parameters', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { unfiltrable: 'yes' },
                    defaultFilterableFields
                )
            ).toEqual([]);
        });

        it('should return valid filter from query parameters, with default operator eq', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer({ foo: 'yes' }, defaultFilterableFields)
            ).toEqual([{ name: 'foo', value: 'yes', operator: 'eq' }]);
        });

        it('should return valid filter from query parameters, with properly parsed operator', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { 'foo:gte': '2020-05-02' },
                    defaultFilterableFields
                )
            ).toEqual([{ name: 'foo', value: '2020-05-02', operator: 'gte' }]);
        });

        it('should return each filter with its default operator.', () => {
            const defaultFilterableFields = ['title', 'postalCode'];
            expect(
                filtersSanitizer(
                    {
                        title: 'foo',
                        postalCode: '50',
                    },
                    defaultFilterableFields
                )
            ).toEqual([
                { name: 'title', value: 'foo', operator: '%l%' },
                { name: 'postalCode', value: '50', operator: 'l%' },
            ]);
        });

        it('should take several query parameters', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { foo: 'yes', bar: 'no' },
                    defaultFilterableFields
                )
            ).toEqual([
                { name: 'foo', value: 'yes', operator: 'eq' },
                { name: 'bar', value: 'no', operator: 'eq' },
            ]);
        });

        it('should return valid filter and remove unfiltrable from query parameters', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { bar: 'yes', unfiltrable: 'yes' },
                    defaultFilterableFields
                )
            ).toEqual([{ name: 'bar', value: 'yes', operator: 'eq' }]);
        });

        it('should remove empty valid filters from query parameters', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { foo: 'yes', bar: '   ' },
                    defaultFilterableFields
                )
            ).toEqual([{ name: 'foo', value: 'yes', operator: 'eq' }]);
        });

        it('should not remove null valid filters from query parameters', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { foo: 'yes', bar: null },
                    defaultFilterableFields
                )
            ).toEqual([
                { name: 'foo', value: 'yes', operator: 'eq' },
                { name: 'bar', value: null, operator: 'eq' },
            ]);
        });

        // this looks unnecessary
        // it("should not remove false valid filters from query parameters", () => {
        //     const defaultFilterableFields = ["foo", "bar"];
        //     expect(
        //         filtersSanitizer(
        //             { foo: "yes", bar: false },
        //             defaultFilterableFields
        //         )
        //     ).toEqual([
        //         { name: "foo", value: "yes", operator: "eq" },
        //         { name: "bar", value: false, operator: "eq" },
        //     ]);
        // });

        it('should remove undefined valid filters from query parameters', () => {
            const defaultFilterableFields = ['foo', 'bar'];
            expect(
                filtersSanitizer(
                    { foo: 'yes', bar: undefined },
                    defaultFilterableFields
                )
            ).toEqual([{ name: 'foo', value: 'yes', operator: 'eq' }]);
        });
    });

    describe('sortSanitizer', () => {
        it('should return the first sortable field ASC if sortBy is not set', () => {
            const defaultSortableFields = ['foo', 'bar'];
            expect(
                sortSanitizer(
                    { sortBy: undefined, orderBy: 'DESC' },
                    defaultSortableFields
                )
            ).toEqual(['foo', 'ASC']);
        });

        it('should return the first sortable field ASC if orderBy is not set', () => {
            const defaultSortableFields = ['foo', 'bar'];
            expect(
                sortSanitizer(
                    { sortBy: 'bar', orderBy: undefined },
                    defaultSortableFields
                )
            ).toEqual(['foo', 'ASC']);
        });

        it('should return the first sortable field ASC if query sort is not a sortable field', () => {
            const defaultSortableFields = ['foo', 'bar'];
            expect(
                sortSanitizer(
                    { sortBy: 'notSortable', orderBy: 'DESC' },
                    defaultSortableFields
                )
            ).toEqual(['foo', 'ASC']);
        });

        it('should replace the sort order with ASC if the query param sort order is not valid', () => {
            const defaultSortableFields = ['foo', 'bar'];
            expect(
                sortSanitizer(
                    { sortBy: 'bar', orderBy: 'horizontal' },
                    defaultSortableFields
                )
            ).toEqual(['bar', 'ASC']);
        });

        it('should remove the supernumerary parameters of the sort object', () => {
            const defaultSortableFields = ['foo', 'bar'];
            expect(
                sortSanitizer(
                    { sortBy: 'bar', orderBy: 'DESC', nonsense: 'this' },
                    defaultSortableFields
                )
            ).toEqual(['bar', 'DESC']);
        });

        it('should return a well formated sort from query parameter', () => {
            const defaultSortableFields = ['foo', 'bar'];
            expect(
                sortSanitizer(
                    { sortBy: 'bar', orderBy: 'DESC' },
                    defaultSortableFields
                )
            ).toEqual(['bar', 'DESC']);
        });
    });

    describe('paginationSanitizer', () => {
        it('should return string pagination params as integer if it possible', () => {
            expect(
                paginationSanitizer({ perPage: '12', currentPage: '2' })
            ).toEqual([12, 2]);
        });

        it('should return default pagination if pagination array is empty', () => {
            expect(paginationSanitizer({})).toEqual([10, 1]);
        });

        it('should return default pagination if one of pagination params could not be cast as integer', () => {
            expect(
                paginationSanitizer({ perPage: 'douze', currentPage: '2' })
            ).toEqual([10, 2]);
            expect(
                paginationSanitizer({ perPage: '12', currentPage: 'deux' })
            ).toEqual([12, 1]);
            expect(
                paginationSanitizer({ perPage: {}, currentPage: '2' })
            ).toEqual([10, 2]);
            expect(
                paginationSanitizer({ perPage: null, currentPage: '2' })
            ).toEqual([10, 2]);
        });

        it('should remove the supernumerary parameters of the pagination array', () => {
            expect(
                paginationSanitizer({
                    perPage: 22,
                    currentPage: 3,
                    notPage: 'foo',
                    isPage: 'bar',
                })
            ).toEqual([22, 3]);
        });
    });

    describe('formatPaginationToLinkHeader', () => {
        it('should contain all pagination elements', () => {
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                    pagination: {
                        currentPage: 3,
                        perPage: 10,
                        lastPage: 5,
                    },
                })
            ).toEqual(
                [
                    '</api/resources?currentPage=1&perPage=10>; rel="first"',
                    '</api/resources?currentPage=2&perPage=10>; rel="prev"',
                    '</api/resources?currentPage=3&perPage=10>; rel="self"',
                    '</api/resources?currentPage=4&perPage=10>; rel="next"',
                    '</api/resources?currentPage=5&perPage=10>; rel="last"',
                ].join(',')
            );
        });

        it('should have same first, prev and self elements', () => {
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                    pagination: {
                        currentPage: 1,
                        perPage: 10,
                        lastPage: 3,
                    },
                })
            ).toEqual(
                [
                    '</api/resources?currentPage=1&perPage=10>; rel="first"',
                    '</api/resources?currentPage=1&perPage=10>; rel="prev"',
                    '</api/resources?currentPage=1&perPage=10>; rel="self"',
                    '</api/resources?currentPage=2&perPage=10>; rel="next"',
                    '</api/resources?currentPage=3&perPage=10>; rel="last"',
                ].join(',')
            );
        });

        it('should have same self, next and last elements', () => {
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                    pagination: {
                        currentPage: 3,
                        perPage: 10,
                        lastPage: 3,
                    },
                })
            ).toEqual(
                [
                    '</api/resources?currentPage=1&perPage=10>; rel="first"',
                    '</api/resources?currentPage=2&perPage=10>; rel="prev"',
                    '</api/resources?currentPage=3&perPage=10>; rel="self"',
                    '</api/resources?currentPage=3&perPage=10>; rel="next"',
                    '</api/resources?currentPage=3&perPage=10>; rel="last"',
                ].join(',')
            );
        });

        it('should have same first, prev, self, next and last elements', () => {
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                    pagination: {
                        currentPage: 1,
                        perPage: 10,
                        lastPage: 1,
                    },
                })
            ).toEqual(
                [
                    '</api/resources?currentPage=1&perPage=10>; rel="first"',
                    '</api/resources?currentPage=1&perPage=10>; rel="prev"',
                    '</api/resources?currentPage=1&perPage=10>; rel="self"',
                    '</api/resources?currentPage=1&perPage=10>; rel="next"',
                    '</api/resources?currentPage=1&perPage=10>; rel="last"',
                ].join(',')
            );
        });

        it('should contain return null if any element is missing', () => {
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                    pagination: {
                        currentPage: 3,
                        perPage: 10,
                    },
                })
            ).toBeNull();
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                    pagination: {
                        currentPage: 3,
                        lastPage: 5,
                    },
                })
            ).toBeNull();
            expect(
                formatPaginationToLinkHeader({
                    pagination: {
                        currentPage: 3,
                        lastPage: 5,
                    },
                })
            ).toBeNull();
            expect(
                formatPaginationToLinkHeader({
                    resourceURI: '/api/resources',
                })
            ).toBeNull();
        });
    });
});
