<template>
    <div class="container">
        <div class="card-deck mb-3 text-center">
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">Edit Member</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="updateMember">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Member Name:</label>
                                    <input type="text" class="form-control" v-model="data.name">
                                    <span v-if="errorsData.name">{{ errorsData.name[0] }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Member Email:</label>
                                    <input type="text" class="form-control" v-model="data.email"></input>
                                    <span v-if="errorsData.email">{{ errorsData.email[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Member Telp:</label>
                                    <input class="form-control" v-model="data.telp"></input>
                                    <span v-if="errorsData.telp">{{ errorsData.telp[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <router-link to="/" class="btn btn-success">Back</router-link>
                            <button class="btn btn-primary">Edit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted.')
        },
        data() {
            return {
                data: {},
                errorsData: {},
            }
        },
        created() {
            let id = this.$route.params.id
            let uri = 'http://localhost:8000/api/member/edit/' + id;
            axios
                .get(uri)
                .then(response => {
                    this.data = response.data;
                })
                .catch(err => {
                    console.log(err)
                });
        },
        methods: {
            updateMember() {
                let id = this.$route.params.id
                let uri = 'http://localhost:8000/api/member/update/' + id;
                axios
                    .post(uri, this.data)
                    .then(response => {
                        this.$router.push({ name: 'home' });
                    })
                    .catch(err => {
                        if (err.response && err.response.status == 422) {
                            this.errorsData = err.response.data.errors;
                            console.log(err.response.data.errors)
                        }
                    });
            }
        }
    }
</script>