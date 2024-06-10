<script>
  /**
	 * @type {any[]}
	 */
   export let items = []; // items to display in the table
  /**
	 * @type {any[]}
	 */
   export let columns = []; // column headers and keys


</script>

<div class="flex flex-col mx-5">
  <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 bg-generalbackground">
          <thead class="text-xs text-gray-700 uppercase bg-widgetaccent">
              <tr>
                  {#each columns as column}
                      <th scope="col" class="py-3 px-6">{column.header}</th>
                  {/each}
              </tr>
          </thead>
          <tbody>
              {#each items as item}
                  <tr class="bg-white border-b">
                      {#each columns as column}
                          <td class="py-4 px-6">{item[column.key]}</td>
                      {/each}
                  </tr>
              {/each}
              {#if items.length === 0}
                <tr>
                  <td colspan={columns.length}>No data available</td>
                </tr>
              {/if}
          </tbody>
      </table>
  </div>
</div>
