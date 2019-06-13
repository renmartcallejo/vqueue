namespace AppInterface{
    export interface Event{
        added_by: string,
        company: string,
        end_date: string,
        end_time: string,
        event_id: string,
        location: string,
        queue: Array<any>,
        start_date: string,
        start_time: string,
        title: string,
      }
      
    export interface Customer{
        index: number,
        customer_id: string,
        name: Object,
      }
}