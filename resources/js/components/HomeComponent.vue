<template>
    <div class="container">
        <div class="card-deck mb-3 text-center">
            <div class="card mb-4 shadow-sm">
                <div class="card-header">
                    <h4 class="my-0 font-weight-normal">Member List</h4>
                </div>
                <div class="card-body">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Member Name</th>
                                <th>Member Email</th>
                                <th>Member Telp</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in members" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.telp }}</td>
                                <td>
                                    <router-link :to="{name: 'edit', params: {id: item.id}}" class="btn btn-primary">
                                        Edit</router-link>
                                    <button class="btn btn-danger" @click="deleteMember(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="/create" class="btn btn-lg btn-block btn-primary">Add New Member</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                members: null,
            }
        },
        created() {
            let uri = 'http://localhost:8000/api/member';
            axios
                .get(uri)
                .then(response => {
                    this.members = response.data;
                })
                .catch(err => {
                    console.log(err)
                });
        },
        methods: {
            deleteMember(id) {
                if (confirm("Apakah anda yakin ingin menghapus member ini?")) {
                    let uri = 'http://localhost:8000/api/member/destroy/' + id;
                    axios
                        .delete(uri, this.data)
                        .then(response => {
                            let i = this.members.map(item => item.id).indexOf(id);
                            this.members.splice(i, 1)
                        })
                        .catch(err => {
                            console.log(err)
                        });
                }
            }
        }
    }
</script>