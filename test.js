describe("Issue testing", function () {

    describe('Get issues', () => {
        it('should get 2 issues', async () => {
            await fetchAsync('https://api.github.com/repos/aldav99/jsItog/issues')
                .then(response => response.json())
                .then(issues => issues.filter(element => !element.pull_request))
                .then(issues => {
                    assert.equal(issues.length, 2)
                })
        })
    })

    describe('Don`t get issues', () => {
        it('should get Error', async () => {
            await fetchAsync('https://api.github.com/rep')
                .catch((data) => {
                    assert.typeOf(data, 'Error');
                })
        })
    })
});