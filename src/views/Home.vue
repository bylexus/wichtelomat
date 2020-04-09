<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-avatar> <v-icon color="black">fas fa-gifts</v-icon> </v-avatar>Anlass
            </v-card-title>
            <v-card-text>
                <v-text-field v-model.lazy="anlass" placeholder="z.B. Weihnachten mit Familie" autofocus />
            </v-card-text>
            <v-divider />
                <v-card-title>
                    <v-avatar>
                        <v-icon color="black">fas fa-hat-wizard</v-icon>
                    </v-avatar>
                    Wichtel
                </v-card-title>

                <v-card-text>
                    <v-container fluid>
                        <template v-for="(w, index) in wichtel">
                            <v-row align="center" :key="`row-${w.index}`">
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model.lazy="w.name"
                                        @keydown.enter="onAdd"
                                        @change="onChange"
                                        :autofocus="index > 0"
                                        label="Name"
                                        placeholder="z.B. Mami"
                                        />
                                </v-col>
                                <v-col cols="12" sm="4">
                                    <v-text-field
                                        v-model.lazy="w.gruppe"
                                        @keydown.enter="onAdd"
                                        label="Gruppe"
                                        placeholder="z.B. Eltern"
                                        />
                                </v-col>
                                <v-col cols="12" sm="2">
                                    <v-btn
                                        class="mr-2"
                                        v-if="index + 1 === wichtel.length"
                                        @click.stop="onAdd"
                                        small
                                        fab
                                        color="primary"
                                        >
                                        <v-icon small>fas fa-plus /></v-icon>
                                    </v-btn>
                                    <v-btn
                                        v-if="wichtel.length > 1"
                                        @click.stop="onRemove(w.index)"
                                        small
                                        fab
                                        color="error"
                                        >
                                        <v-icon small>fas fa-minus /></v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-divider v-if="index + 1 < wichtel.length" :key="`div-${w.index}`" />
                        </template>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click.stop="dice" :loading="loading">
                        <v-icon left>fas fa-dice</v-icon>
                        Wichtel würfeln!
                    </v-btn>
                    <v-btn color="red lighten-2 white--text" @click.stop="clear" :loading="loading">
                        <v-icon left>fas fa-trash</v-icon>
                        Wichtel löschen
                    </v-btn>
                    <v-spacer />
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" class="mr-2" @click="onUpload">
                                    <v-icon>fas fa-upload</v-icon>
                                </v-btn>
                            </template>
                            <span>Einstellungen laden</span>
                            <input type="file" ref="loadinput" style="display:none" @change="onUploadFileChoose"/>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" @click="onDownload">
                                    <v-icon>fas fa-download</v-icon>
                                </v-btn>
                            </template>
                            <span>Einstellungen speichern (download)</span>
                        </v-tooltip>
                </v-card-actions>
                <v-card-text v-if="error">
                    <v-alert type="error">{{ error }}</v-alert>
                </v-card-text>
        </v-card>

        <v-card v-if="result" class="mt-5">
            <v-card-title ref="result">
                <v-avatar><v-icon color="black">fas fa-dice</v-icon></v-avatar>
                Würfel-Resultat
                <v-spacer />
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon @click.stop="onStoreResult" v-on="on">
                                <v-icon>fas fa-save</v-icon>
                            </v-btn>
                        </template>
                        <span>Resultat aufbewahren</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon @click.stop="result = null" v-on="on">
                                <v-icon>fas fa-times</v-icon>
                            </v-btn>
                        </template>
                        <span>Resultat löschen</span>
                    </v-tooltip>
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>wichtelt für ...</th>
                            <th>... und hat Wichtel</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="wichtel in result" :key="wichtel.index">
                            <td>
                                <strong>{{ wichtel.name }}</strong>
                            </td>
                            <td>
                                {{ findWichtelByIndex(wichtel.isWichtelFor, result).name }}
                            </td>
                            <td>
                                {{ findWichtelByIndex(wichtel.hasWichtel, result).name }}
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
        </v-card>

        <v-card v-if="storedResults.length > 0" class="mt-5">
            <v-card-title>
                <v-avatar> <v-icon color="black">fas fa-save</v-icon> </v-avatar> Gespeicherte Resultate
            </v-card-title>
            <v-card-text>
                <v-expansion-panels>
                    <v-expansion-panel v-for="(result, index) in storedResults" :key="result.time">
                        <v-expansion-panel-header>
                            <span>
                                <strong>{{ result.title }}</strong>
                                <span> | {{ result.time }}</span>
                            </span>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-simple-table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>wichtelt für ...</th>
                                        <th>... und hat Wichtel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="wichtel in result.result" :key="wichtel.index">
                                        <td>
                                            <strong>{{ wichtel.name }}</strong>
                                        </td>
                                        <td>
                                            {{ findWichtelByIndex(wichtel.isWichtelFor, result.result).name }}
                                        </td>
                                        <td>
                                            {{ findWichtelByIndex(wichtel.hasWichtel, result.result).name }}
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                            <v-btn icon color="red" @click="removeStoredResult(index)">
                                <v-icon>fas fa-trash</v-icon>
                            </v-btn>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { dice, loadState, saveState, findWichtelByIndex } from '@/lib.js';

export default {
    name: 'Home',
    components: {},
    data: function() {
        return {
            loading: false,
            error: null,
            anlass: '',
            wichtel: [this.createNewEntry()],
            result: null,
            storedResults: []
        };
    },
    watch: {
        anlass: function() {
            this.saveState();
        },
        wichtel: function() {
            this.saveState();
        },
        result: function() {
            this.saveState();
        },
        storedResults: function() {
            this.saveState();
        }
    },
    computed: {
    },
    mounted() {
        this.loadState(loadState());
    },
    methods: {
        createNewEntry() {
            let index = ((this.wichtel || []).reduce((max, curr) => (curr.index > max ? curr.index : max), 0) || 0) + 1;
            return {
                index,
                name: null,
                gruppe: null
            };
        },
        onAdd() {
            this.wichtel.push(this.createNewEntry());
        },
        onRemove(index) {
            this.wichtel = this.wichtel.filter(w => w.index !== index);
        },

        onChange() {
            this.saveState();
        },

        saveState() {
            saveState({
                anlass: this.anlass,
                wichtel: this.wichtel,
                result: this.result,
                storedResults: this.storedResults
            });
        },

        loadState(state) {
            this.anlass = state.anlass || null;
            this.wichtel = state.wichtel || [this.createNewEntry()];
            this.result = state.result || null;
            this.storedResults = state.storedResults || [];
        },

        clear() {
            if (confirm('Sicher?')) {
                this.error = null;
                this.wichtel = [];
                this.wichtel = [this.createNewEntry()];
            }
        },

        dice() {
            this.loading = true;
            this.error = null;
            try {
                let result = dice(
                    // filter out empty entries:
                    this.wichtel.filter(w => (w.name || '').length > 0 || (w.gruppe || '').length > 0)
                );
                this.result = result;
                if (this.$refs.result) {
                    this.$vuetify.goTo(this.$refs.result);
                }
            } catch (e) {
                this.error = 'Oh nein! Es konnte keine vollständige Zuteilung gefunden werden!';
            }
            this.loading = false;
        },

        findWichtelByIndex: (i, wichtels) => findWichtelByIndex(i, wichtels),

        onStoreResult() {
            let storeEntry = {
                title: this.anlass || '(kein Anlass)',
                time: new Date().toLocaleString(),
                result: this.result
            };
            this.storedResults = [storeEntry].concat(this.storedResults || []);
        },

        removeStoredResult(index) {
            this.storedResults = this.storedResults.slice(0, index).concat(this.storedResults.slice(index + 1));
        },

        /**
         * Downloading works totally local in the browser:
         * 1. create a File object with the JSON data
         * 2. Create a link element, set the File data URL as href target
         * 3. execute a click to the href programmatically
         */
        onDownload() {
            let data = JSON.stringify({
                anlass: this.anlass,
                wichtel: this.wichtel,
                result: this.result,
                storedResults: this.storedResults
            });
            let file = new File([data], `wichtelomat-${new Date().getTime()}.json`, {type: 'application/json'});
            let url = window.URL.createObjectURL(file);
            let linkElem = window.document.createElement('a');
            linkElem.href = url;
            linkElem.download = file.name;
            document.body.appendChild(linkElem);
            linkElem.click();
            document.body.removeChild(linkElem);
        },

        onUpload() {
            this.$refs.loadinput.click();
        },

        onUploadFileChoose(e) {
            if (e.target.files.length > 0) {
                let file = e.target.files[0],
                    reader = new FileReader();
                reader.onloadend = () => {
                    let state = JSON.parse(reader.result) || {};
                    this.loadState(state);
                    this.saveState();
                };
                reader.readAsText(file)
            }
        }
    }
};
</script>
