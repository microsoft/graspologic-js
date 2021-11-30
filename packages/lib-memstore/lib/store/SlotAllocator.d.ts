/**
 * A class for managing id allocation
 */
export declare class SlotAllocator {
    private availableIndices;
    private nextAvailableIndex;
    private capacity;
    /**
     * Constructor for the SlotAllocator
     * @param capacity The number of ids to support
     * @param consumed If true, the allocator is assumed to be full
     * @throws If an invalid capacity is passed to the constructor
     */
    constructor(capacity?: number, consumed?: boolean);
    /**
     * Resets the allocator back to the default state
     * @param capacity The number of items to support
     * @throws If an invalid capacity is passed to the function
     */
    reset(capacity: number): void;
    /**
     * Grow the capacity of the slot allocator by __newCapacity__
     * @param newCapacity The new capacity of the allocator
     * @throws If an invalid capacity is passed to the function
     */
    grow(newCapacity: number): void;
    /**
     * Returns true if there are available ids
     */
    get hasFreeSpace(): boolean;
    /**
     * Frees __index__ for re-use
     * @param index The index to free
     * @throws An error for an invalid index
     */
    free(index: number): void;
    /**
     * Allocates a new index
     *
     * @throws An error if there is no space available
     */
    alloc(): number;
    /**
     * Returns an iterator for the used slots
     */
    used(): Iterable<number>;
    /**
     * Returns true if the given index has been allocated
     * @param index The index to check
     */
    has(index: number): boolean;
    /**
     * Returns the number of used indices
     */
    get usedCount(): number;
    /**
     * Destroy's the allocator
     */
    destroy(): void;
}
