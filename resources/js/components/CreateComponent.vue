<template>
    <div class="container">
        <div class="card-deck mb-3 text-center">
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">Create New Member</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="addMember">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Member Name:</label>
                                    <input type="text" class="form-control" v-model="data.name"
                                        placeholder="Type ur name">
                                    <span v-if="errorsData.name">{{ errorsData.name[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Member Email:</label>
                                    <input type="text" class="form-control" v-model="data.email"
                                        placeholder="Type ur email">
                                    <span v-if="errorsData.email">{{ errorsData.email[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label>Member Telp:</label>
                                    <input class="form-control" v-model="data.telp" placeholder="Type ur number">
                                    <span v-if="errorsData.telp">{{ errorsData.telp[0] }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <router-link to="/" class="btn btn-success">Back</router-link>
                            <button class="btn btn-primary">Create</button>
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
        methods: {
            addMember() {
                this.errors = []
                let uri = 'http://localhost:8000/api/member/create';
                axios
                    .post(uri, this.data)
                    .then(response => {
                        this.success = true;
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