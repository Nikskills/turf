<script>
    let searchTerm = '';
    let items = [
        { naam: "John", bier: 5, beschrijving: "Keihard Pilsen", datum: "2022-04-01" },
        { naam: "Emma", bier: 8, beschrijving: "Laffe Borrel", datum: "2022-04-02" },
        { naam: "Sophia", bier: 3, beschrijving: "Brak", datum: "2022-04-03" },
        { naam: "Liam", bier: 6, beschrijving: "Lachu", datum: "2022-04-04" }
    ];
    $: filteredItems = items.filter((item) =>
      item.naam.toLowerCase().includes(searchTerm.toLowerCase())
    );
  </script>
  
  <div class="flex flex-col mx-5">
    <div class="mb-4">
      <input
        type="text"
        class="form-input px-4 py-2 border rounded-lg w-1/6 h-[10%]"
        placeholder="Zoek op naam"
        bind:value={searchTerm}
      />
    </div>
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 bg-generalbackground">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 bg-widgetaccent">
            <tr>
              <th scope="col" class="py-3 px-6">Naam</th>
              <th scope="col" class="py-3 px-6"># Bier</th>
              <th scope="col" class="py-3 px-6">Beschrijving</th>
              <th scope="col" class="py-3 px-6">Datum</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredItems as item}
              <tr class="bg-white border-b">
                <td class="py-4 px-6">{item.naam}</td>
                <td class="py-4 px-6">{item.bier}</td>
                <td class="py-4 px-6">{item.beschrijving}</td>
                <td class="py-4 px-6">{item.datum}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      
  </div>
  